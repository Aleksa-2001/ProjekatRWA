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

@Component({
  selector: 'app-proizvod-dialog',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './proizvod-dialog.component.html',
  styleUrl: './proizvod-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodDialogComponent implements OnInit {

  form!: FormGroup
  
  @Input() mode: number = 0
  title: string = ""
  
  proizvod$: Observable<Proizvod | null> = of()
  prodavnica$: Observable<Prodavnica | null> = of()
  proizvodID: number = -1
  prodavnica: Prodavnica | null = null
  type: string = ''
  tipProizvoda: string = ''
  
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

            ramTipMemorije: [(proizvod as RAM).tipMemorije],
            ramBrojModula: [(proizvod as RAM).brojRAMModula],
            ramVelicina: [(proizvod as RAM).velicina],
            ramFrekvencija: [proizvod.type === 'RAM' ? (proizvod as RAM).frekvencija : '']
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
        ramFrekvencija: ['']
      })
    }
  }

  onChangeTip() {
    this.tipProizvoda = this.form.value.tipProizvoda ? this.form.value.tipProizvoda : ''
  }

  onChangeTipKomponente() {
    this.type = this.form.value.type ? this.form.value.type : ''
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
        opis: proizvod.opis,
        slika: proizvod.slika,
        prodavnica: this.prodavnica
      }      

      let proizvodData: any = {}

      switch (proizvodBase.type) {
        case 'CPU':
          proizvodData = {
            ...proizvodBase,
            socket: proizvod.cpuSocket,
            frekvencija: proizvod.cpuFrekvencija,
            brojJezgara: proizvod.cpuBrojJezgara,
            brojNiti: proizvod.cpuBrojNiti
          }
          break
        case 'GPU':
          proizvodData = {
            ...proizvodBase,
            frekvencija: proizvod.gpuFrekvencija,
            VRAM: proizvod.gpuVRAM
          }
          break
        case 'RAM':
          proizvodData = {
            ...proizvodBase,
            tipMemorije: proizvod.ramTipMemorije,
            brojRAMModula: proizvod.ramBrojModula,
            velicina: proizvod.ramVelicina,
            frekvencija: proizvod.ramFrekvencija
          }
          break
        default:
          proizvodData = proizvodBase
      }

      if (this.mode === 1) {
        proizvodData.slika = this.generatePath(path, this.filename, this.proizvodID)
        this.store.dispatch(ProizvodiActions.updateItem({ selectedProizvodID: proizvodData.id, selectedProizvod: <Proizvod>proizvodData, file: this.formData }))
        this.filename = proizvodData.slika
      }
      else {
        this.store.dispatch(ProizvodiActions.addItem({ proizvod: <Proizvod>proizvodData, file: this.formData }))
      }
    }
  }

  private generatePath(path: string, filename: string, id?: number) {
    if (filename) return `${path}${id ?? 'temp'}${filename.substring(this.filename.lastIndexOf('.'), this.filename.length)}`
    else return ""
  }

}
