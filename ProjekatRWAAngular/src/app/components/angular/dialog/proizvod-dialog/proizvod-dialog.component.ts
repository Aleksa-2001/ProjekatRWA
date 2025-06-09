import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Proizvod } from '../../../../models/proizvod';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { filter, Observable, of, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { CPU } from '../../../../models/komponente/cpu';
import { GPU } from '../../../../models/komponente/gpu';
import * as ProizvodiActions from "../../../../store/proizvod/proizvod.actions"
import { Prodavnica } from '../../../../models/prodavnica';
import { RAM } from '../../../../models/komponente/ram';
import { MaticnaPloca } from '../../../../models/komponente/maticna-ploca';
import { Skladiste } from '../../../../models/komponente/skladiste';
import { Napajanje } from '../../../../models/komponente/napajanje';

@Component({
  selector: 'app-proizvod-dialog',
  imports: [ReactiveFormsModule, NgIf, NgClass],
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

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
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

          this.form = this.fb.group({
            type: [proizvod.type],
            tipProizvoda: [proizvod.tipProizvoda, Validators.required],
            proizvodjac: [proizvod.proizvodjac, Validators.required],
            naziv: [proizvod.naziv, Validators.required],
            cena: [proizvod.cena, Validators.required],
            opis: [proizvod.opis],
            slika: [''],

            cpuSocket: [(proizvod as CPU).socket],
            cpuFrekvencija: [proizvod.type === 'CPU' ? (proizvod as CPU).frekvencija : ''],
            cpuBrojJezgara: [(proizvod as CPU).brojJezgara],
            cpuBrojNiti: [(proizvod as CPU).brojNiti],

            gpuFrekvencija: [proizvod.type === 'GPU' ? (proizvod as GPU).frekvencija : ''],
            gpuVRAM: [(proizvod as GPU).VRAM],

            ramTipMemorije: [proizvod.type === 'RAM' ? (proizvod as RAM).tipMemorije : ''],
            ramBrojModula: [(proizvod as RAM).brojRAMModula],
            ramVelicina: [proizvod.type === 'RAM' ? (proizvod as RAM).velicina : ''],
            ramFrekvencija: [proizvod.type === 'RAM' ? (proizvod as RAM).frekvencija : ''],

            maticnaPlocaTipMaticnePloce: [(proizvod as MaticnaPloca).tipMaticnePloce], 
            maticnaPlocaSocket: [proizvod.type === 'MaticnaPloca' ? (proizvod as MaticnaPloca).socket : ''], 
            maticnaPlocaBrojRAMSlotova: [(proizvod as MaticnaPloca).brojRAMSlotova], 
            maticnaPlocaBrojUSB20Portova: [(proizvod as MaticnaPloca).brojUSB20Portova],
            maticnaPlocaBrojUSB30Portova: [(proizvod as MaticnaPloca).brojUSB30Portova],
            maticnaPlocaBrojUSB31Portova: [(proizvod as MaticnaPloca).brojUSB31Portova],

            skladisteTipMemorije: [proizvod.type === 'Skladiste' ? (proizvod as Skladiste).tipMemorije : ''], 
            skladisteVelicina: [proizvod.type === 'Skladiste' ? (proizvod as Skladiste).velicina : ''],

            napajanjeSnaga: [(proizvod as Napajanje).snaga],
            napajanjeModularno: [(proizvod as Napajanje).modularno]
          })

          //this.tip = this.form.value.tip ? Number(this.form.value.tip) : 0
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

      this.form = this.fb.group({
        type: [''],
        tipProizvoda: ['', Validators.required],
        proizvodjac: ['', Validators.required],
        naziv: ['', Validators.required],
        cena: ['', Validators.required],
        opis: [''],
        slika: [''],

        cpuSocket: [''],
        cpuFrekvencija: [''],
        cpuBrojJezgara: [''],
        cpuBrojNiti: [''],

        gpuFrekvencija: [''],
        gpuVRAM: [''],

        ramTipMemorije: [''],
        ramBrojModula: [''],
        ramVelicina: [''],
        ramFrekvencija: [''],

        maticnaPlocaTipMaticnePloce: [''],
        maticnaPlocaSocket: [''], 
        maticnaPlocaBrojRAMSlotova: [''], 
        maticnaPlocaBrojUSB20Portova: [''],
        maticnaPlocaBrojUSB30Portova: [''],
        maticnaPlocaBrojUSB31Portova: [''],

        skladisteTipMemorije: [''], 
        skladisteVelicina: [''],

        napajanjeSnaga: [''],
        napajanjeModularno: [false]
      })
    }
  }

  onChangeTip() {
    this.tipProizvoda = this.form.value.tipProizvoda ? this.form.value.tipProizvoda : ''
  }

  onChangeTipKomponente() {
    this.type = this.form.value.type ? this.form.value.type : ''
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

  onSubmit() {
    if (this.form.valid) {
      const path = "images/proizvodi/"
      const proizvod = this.form.getRawValue()
      
      const proizvodBase = {
        id: this.proizvodID,
        type: proizvod.type,
        tipProizvoda: proizvod.tipProizvoda,
        proizvodjac: proizvod.proizvodjac,
        naziv: proizvod.naziv,
        cena: proizvod.cena,
        opis: proizvod.opis ?? "",
        slika: (proizvod.slika && this.filename) ? proizvod.slika : "",
        prodavnica: this.prodavnica
      }      

      let proizvodData: any = {}

      switch (proizvodBase.type) {
        case 'CPU':
          proizvodData = {
            ...proizvodBase,
            socket: proizvod.cpuSocket ?? "",
            frekvencija: proizvod.cpuFrekvencija ?? 0,
            brojJezgara: proizvod.cpuBrojJezgara ?? 0,
            brojNiti: proizvod.cpuBrojNiti ?? 0
          }
          break
        case 'GPU':
          proizvodData = {
            ...proizvodBase,
            frekvencija: proizvod.gpuFrekvencija ?? 0,
            VRAM: proizvod.gpuVRAM ?? 0
          }
          break
        case 'RAM':
          proizvodData = {
            ...proizvodBase,
            tipMemorije: proizvod.ramTipMemorije ?? "",
            brojRAMModula: proizvod.ramBrojModula ?? 0,
            velicina: proizvod.ramVelicina ?? 0,
            frekvencija: proizvod.ramFrekvencija ?? 0
          }
          break
        case 'MaticnaPloca':
          proizvodData = {
            ...proizvodBase,
            tipMaticnePloce: proizvod.maticnaPlocaTipMaticnePloce ?? "", 
            socket: proizvod.maticnaPlocaSocket ?? "", 
            brojRAMSlotova: proizvod.maticnaPlocaBrojRamSlotova ?? 0, 
            brojUSB20Portova: proizvod.maticnaPlocaBrojUSB20Portova ?? 0,
            brojUSB30Portova: proizvod.maticnaPlocaBrojUSB30Portova ?? 0,
            brojUSB31Portova: proizvod.maticnaPlocaBrojUSB31Portova ?? 0
          }
          break
        case 'Skladiste':
          proizvodData = {
            ...proizvodBase,
            tipMemorije: proizvod.skladisteTipMemorije ?? "", 
            velicina: proizvod.skladisteVelicina ?? 0
          }
          break
        case 'Napajanje':
          proizvodData = {
            ...proizvodBase,
            snaga: proizvod.napajanjeSnaga ?? 0, 
            modularno: proizvod.napajanjeModularno ?? false
          }
          break
        default:
          proizvodData = proizvodBase
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
