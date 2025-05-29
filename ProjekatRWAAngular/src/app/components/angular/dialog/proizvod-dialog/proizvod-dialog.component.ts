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
  formData: any
  type: string = ''
  tipProizvoda: string = ''

  @Input() title!: string
  proizvod$: Observable<Proizvod | null> = of()
  prodavnica$: Observable<Prodavnica | null> = of()
  proizvodID: number = -1
  prodavnica: Prodavnica | null = null

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.title === 'Izmeni proizvod') {
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.proizvod$.pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          this.proizvodID = proizvod.id
          this.type = proizvod.type
          this.tipProizvoda = proizvod.tipProizvoda
          this.prodavnica = proizvod.prodavnica

          this.form = this.fb.group({
            type: [proizvod.type],
            tipProizvoda: [proizvod.tipProizvoda, Validators.required],
            proizvodjac: [proizvod.proizvodjac, Validators.required],
            naziv: [proizvod.naziv, Validators.required],
            cena: [proizvod.cena, Validators.required],
            opis: [proizvod.opis],
            slika: [proizvod.slika],

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

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value
      
      const proizvodBase = {
        id: this.proizvodID,
        type: value.type,
        tipProizvoda: value.tipProizvoda,
        proizvodjac: value.proizvodjac,
        naziv: value.naziv,
        cena: value.cena,
        opis: value.opis,
        slika: value.slika,
        prodavnica: this.prodavnica
      }      

      let proizvodData: any = {}

      switch (proizvodBase.type) {
        case 'CPU':
          proizvodData = {
            ...proizvodBase,
            socket: value.cpuSocket,
            frekvencija: value.cpuFrekvencija,
            brojJezgara: value.cpuBrojJezgara,
            brojNiti: value.cpuBrojNiti
          }
          break
        case 'GPU':
          proizvodData = {
            ...proizvodBase,
            frekvencija: value.gpuFrekvencija,
            VRAM: value.gpuVRAM
          }
          break
        case 'RAM':
          proizvodData = {
            ...proizvodBase,
            tipMemorije: value.ramTipMemorije,
            brojRAMModula: value.ramBrojModula,
            velicina: value.ramVelicina,
            frekvencija: value.ramFrekvencija
          }
          break
        default:
          proizvodData = proizvodBase
      }

      console.log(proizvodData)

      if (this.title === 'Izmeni proizvod') {
        this.store.dispatch(ProizvodiActions.updateItem({ selectedProizvodID: proizvodData.id, selectedProizvod: <Proizvod>proizvodData }))
      }
      else {
        this.store.dispatch(ProizvodiActions.addItem({ proizvod: <Proizvod>proizvodData }))
      }
    }
  }

}
