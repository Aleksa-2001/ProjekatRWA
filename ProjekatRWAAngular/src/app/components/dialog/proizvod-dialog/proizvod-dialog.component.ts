import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Proizvod } from '../../../models/proizvod';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectSelectedProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { filter, Observable, of, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../store/proizvod/proizvod.selectors';
import { Prodavnica } from '../../../models/prodavnica';
import { CPUFormComponent } from "./komponente/cpu-form/cpu-form.component";
import { GPUFormComponent } from "./komponente/gpu-form/gpu-form.component";
import { RAMFormComponent } from "./komponente/ram-form/ram-form.component";
import { MaticnaPlocaFormComponent } from "./komponente/maticna-ploca-form/maticna-ploca-form.component";
import { SkladisteFormComponent } from "./komponente/skladiste-form/skladiste-form.component";
import { NapajanjeFormComponent } from "./komponente/napajanje-form/napajanje-form.component";
import { komponentaFormMetadata } from './komponente/komponenta-form.metadata';
import * as ProizvodiActions from "../../../store/proizvod/proizvod.actions"

@Component({
  selector: 'app-proizvod-dialog',
  imports: [
    NgIf,
    NgClass,
    ReactiveFormsModule,
    CPUFormComponent,
    GPUFormComponent,
    RAMFormComponent,
    MaticnaPlocaFormComponent,
    SkladisteFormComponent,
    NapajanjeFormComponent
],
  templateUrl: './proizvod-dialog.component.html',
  styleUrl: './proizvod-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodDialogComponent implements OnInit {

  form!: FormGroup
  
  @Input() modalID!: string
  @Input() mode: number = 0
  title: string = ""
  
  proizvod$: Observable<Proizvod | null> = of()
  prodavnica$: Observable<Prodavnica | null> = of()
  proizvodID: number = -1
  prodavnica: Prodavnica | null = null
  type: string = ""
  tipProizvoda: string = ""
  
  formData?: FormData
  filename: string = ""

  get formInputData(): FormGroup {
    return this.form.get('formInputData') as FormGroup
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipProizvoda: ['', Validators.required],
      proizvodjac: ['', Validators.required],
      naziv: ['', Validators.required],
      cena: ['', Validators.required],
      opis: [''],
      slika: [''],
      formInputData: this.fb.group([])
    })

    //TODO: Ukloniti ugnjezdeni subscribe
    this.form.get('tipProizvoda')?.valueChanges.subscribe(tipProizvoda => {
      const formInputDataGroup = this.form.get('formInputData') as FormGroup
      formInputDataGroup.reset()

      if (tipProizvoda !== '') {
        formInputDataGroup.addControl('type', this.fb.control('', Validators.required))

        formInputDataGroup.get('type')?.valueChanges.subscribe(type => {
          this.addControlsForType(type!, formInputDataGroup)
        })
      }
      //else {
      //  formInputDataGroup.removeControl('type')
      //}
    })

    if (this.mode === 1) {
      this.title = 'Izmeni proizvod'
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.proizvod$.pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          this.proizvodID = proizvod.id
          this.type = proizvod.type
          this.tipProizvoda = proizvod.tipProizvoda
          this.prodavnica = proizvod.prodavnica
          this.filename = proizvod.slika

          this.form.patchValue({
            tipProizvoda: proizvod.tipProizvoda, 
            proizvodjac: proizvod.proizvodjac, 
            naziv: proizvod.naziv, 
            cena: proizvod.cena, 
            opis: proizvod.opis, 
            slika: '',
            formInputData: {
              type: proizvod.type
            }
          })

          const kontrole = komponentaFormMetadata[proizvod.type]
          if (kontrole) {
            const patchObj: any = {};
            for (const key of Object.keys(kontrole())) {
              if (key in proizvod) {
                patchObj[key] = (proizvod as any)[key];
              }
            }

            this.formInputData.patchValue(patchObj)
          }
        })
      ).subscribe()
    }
    else {
      this.title = 'Dodaj proizvod'
      this.prodavnica$ = this.store.select(selectSelectedProdavnica)
      this.prodavnica$.pipe(
        filter(prodavnica => !!prodavnica),
        tap(prodavnica => this.prodavnica = prodavnica)
      ).subscribe()
    }
  }

  addControlsForType(type: string, group: FormGroup): void {
    Object.keys(group.controls).forEach(key => {
      if (key !== 'type') group.removeControl(key)
    })
    
    const kontrole = komponentaFormMetadata[type]
    if (kontrole) {
      const kontroleGroup = this.fb.group(kontrole())
      Object.entries(kontroleGroup.controls).forEach(([key, control]) => {
        group.addControl(key, control)
      })
    }
  }

  onChangeTip() {    
    this.tipProizvoda = this.form.value.tipProizvoda ? this.form.value.tipProizvoda : ''
  }

  onChangeTipKomponente() {
    this.type = this.formInputData.value.type ? this.formInputData.value.type : ''
  }

  resetForm(addEvent: boolean = false) {
    this.form.reset({
      type: '',
      tipProizvoda: '',
    })
    
    this.type = ""
    this.tipProizvoda = ""

    if (addEvent) this.filename = ""
    else this.removeFile()
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        this.filename = `${file.name}`
        this.formData = new FormData()
        this.formData.append('file', file)
        return
      }
      else {
        console.log("Fajl nije slika!")
      }
    }
  }

  removeFile() {
    this.formData?.delete('file')
    this.formData = undefined
    this.filename = ""
  }

  onCancel() {
    if (this.mode === 0) this.resetForm()
  }

  onSubmit() {
    if (this.form.valid) {
      const path = "images/proizvodi/"
      const proizvod = this.form.getRawValue()
      
      const proizvodData = {
        id: this.proizvodID,
        tipProizvoda: proizvod.tipProizvoda,
        proizvodjac: proizvod.proizvodjac,
        naziv: proizvod.naziv,
        cena: proizvod.cena,
        opis: proizvod.opis ?? "",
        slika: (proizvod.slika && this.filename) ? proizvod.slika : "",
        prodavnica: this.prodavnica,
        ...this.formInputData.getRawValue()
      }

      //console.log(proizvodData)

      if (this.mode === 1) {
        proizvodData.slika = this.generatePath(path, this.filename, this.proizvodID)
        this.store.dispatch(ProizvodiActions.updateItem({ selectedProizvodID: proizvodData.id, selectedProizvod: <Proizvod>proizvodData, file: this.formData }))
        this.filename = proizvodData.slika
      }
      else {
        if (!this.filename) {
          proizvodData.slika = ""
          this.removeFile()
        }
        this.store.dispatch(ProizvodiActions.addItem({ proizvod: <Proizvod>proizvodData, file: this.formData }))
        this.resetForm(true)
      }
    }
  }

  private generatePath(path: string, filename: string, id?: number) {
    if (filename) return `${path}${id ?? 'temp'}${filename.substring(this.filename.lastIndexOf('.'), this.filename.length)}`
    else return ""
  }

}
