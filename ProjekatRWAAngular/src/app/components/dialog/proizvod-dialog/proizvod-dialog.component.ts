import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Proizvod } from '../../../models/proizvod';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectSelectedProdavnica } from '../../../store/prodavnica/prodavnica.selectors';
import { filter, map, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../store/proizvod/proizvod.selectors';
import { Prodavnica } from '../../../models/prodavnica';

import { CPUFormComponent } from "./komponente/cpu-form/cpu-form.component";
import { GPUFormComponent } from "./komponente/gpu-form/gpu-form.component";
import { RAMFormComponent } from "./komponente/ram-form/ram-form.component";
import { MaticnaPlocaFormComponent } from "./komponente/maticna-ploca-form/maticna-ploca-form.component";
import { SkladisteFormComponent } from "./komponente/skladiste-form/skladiste-form.component";
import { NapajanjeFormComponent } from "./komponente/napajanje-form/napajanje-form.component";
import { KucisteFormComponent } from "./komponente/kuciste-form/kuciste-form.component";
import { komponentaFormMetadata } from './komponente/komponenta-form.metadata';

import { MonitorFormComponent } from "./oprema/monitor-form/monitor-form.component";
import { TastaturaFormComponent } from "./oprema/tastatura-form/tastatura-form.component";
import { MisFormComponent } from "./oprema/mis-form/mis-form.component";
import { SlusaliceFormComponent } from "./oprema/slusalice-form/slusalice-form.component";
import { ZvucnikFormComponent } from "./oprema/zvucnik-form/zvucnik-form.component";
import { StampacFormComponent } from "./oprema/stampac-form/stampac-form.component";
import { opremaFormMetadata } from './oprema/oprema-form.metadata';

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
    NapajanjeFormComponent, 
    KucisteFormComponent, 
    MonitorFormComponent, 
    TastaturaFormComponent, 
    MisFormComponent, 
    SlusaliceFormComponent, 
    ZvucnikFormComponent, 
    StampacFormComponent
],
  templateUrl: './proizvod-dialog.component.html',
  styleUrl: './proizvod-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodDialogComponent implements OnInit, OnDestroy {

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

  formChangesSub$: Subscription | null = null
  prodavnicaSub$: Subscription | null = null

  get formInputData(): FormGroup {
    return this.form.get('formInputData') as FormGroup
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm()

    if (this.mode === 1) {
      this.title = 'Izmeni proizvod'
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.proizvod$.pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => this.fillForm(proizvod))
      ).subscribe()
    }
    else {
      this.title = 'Dodaj proizvod'
      this.prodavnica$ = this.store.select(selectSelectedProdavnica)
      this.prodavnicaSub$ = this.prodavnica$.pipe(
        filter(prodavnica => !!prodavnica),
        tap(prodavnica => this.prodavnica = prodavnica)
      ).subscribe()
    }
  }

  ngOnDestroy(): void {
    this.prodavnicaSub$?.unsubscribe()
    this.formChangesSub$?.unsubscribe()
  }

  initForm() {
    this.form = this.fb.group({
      tipProizvoda: ['', Validators.required],
      proizvodjac: ['', Validators.required],
      naziv: ['', Validators.required],
      cena: ['', Validators.required],
      opis: [],
      slika: [],
      formInputData: this.fb.group({
        type: ['', Validators.required]
      })
    })

    this.formChangesSub$ = this.form.get('tipProizvoda')!.valueChanges.pipe(
      map(value => value as string),
      tap(tipProizvoda => {
        this.formInputData.reset()
        this.type = tipProizvoda === "Racunar" ? tipProizvoda : ''
        this.formInputData.get('type')!.setValue(this.type)
      }),
      switchMap(() => this.formInputData.get('type') ? this.formInputData.get('type')!.valueChanges : of(null)),
      filter(type => !!type),
      map(type => type as string),
      tap(type => {
        this.type = type
        this.updateControls(this.type, this.formInputData)
      })
    ).subscribe()
  }

  updateControls(type: string, group: FormGroup): void {
    Object.keys(group.controls).forEach(key => {
      if (key !== 'type') group.removeControl(key)
    })
    
    const kontrole = komponentaFormMetadata[type] || opremaFormMetadata[type]
    if (kontrole) {
      const kontroleGroup = this.fb.group(kontrole())
      Object.entries(kontroleGroup.controls).forEach(([key, control]) => {
        group.addControl(key, control)
      })
    }
  }

  fillForm(proizvod: Proizvod) {
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

    const kontrole = komponentaFormMetadata[proizvod.type] || opremaFormMetadata[proizvod.type]
    if (kontrole) {
      const patchObj: any = { }
      for (const key of Object.keys(kontrole())) {
        if (key in proizvod) {
          patchObj[key] = (proizvod as any)[key]
        }
      }
      
      this.formInputData.patchValue(patchObj)
    }
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

  onChangeTip(event: any) {
    this.tipProizvoda = event.target.value ? event.target.value : ''
  }

  onChangeTipKomponente(event: any) {
    this.type = event.target.value ? event.target.value : ''
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
        opis: proizvod.opis,// ?? "",
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
    return filename ? `${path}${id ?? 'temp'}${filename.substring(this.filename.lastIndexOf('.'), this.filename.length)}` : ''
  }

}
