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
  tip: number = 0
  tipKomponente: string = ''

  @Input() title!: string
  proizvod$: Observable<Proizvod | null> = of()
  proizvodID: number = -1

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.title === 'Izmeni proizvod') {
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.proizvod$.pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          this.proizvodID = proizvod.id
          this.tip = proizvod.tip == 'CPU' || proizvod.tip == 'GPU' ? 2 : 0
          this.tipKomponente = proizvod.tip

          this.form = this.fb.group({
            tip: [this.tip.toString(), Validators.required],
            proizvodjac: [proizvod.proizvodjac, Validators.required],
            naziv: [proizvod.naziv, Validators.required],
            cena: [proizvod.cena, Validators.required],
            opis: [proizvod.opis],
            slika: [proizvod.slika],
            //tipKomponente: [(proizvod as RacunarskaKomponenta).tipKomponente],
            tipKomponente: [proizvod.tip],

            socket: [(proizvod as CPU).socket ?? ''],
            frekvencija: [(proizvod as CPU | GPU).frekvencija],
            VRAM: [(proizvod as GPU).VRAM]
          })

          //this.tip = this.form.value.tip ? Number(this.form.value.tip) : 0
        })
      ).subscribe()
    }
    else {
      this.form = this.fb.group({
        tip: ['', Validators.required],
        proizvodjac: ['', Validators.required],
        naziv: ['', Validators.required],
        cena: ['', Validators.required],
        opis: [''],
        slika: [''],
        tipKomponente: [''],

        socket: [''],
        frekvencija: [''],
        VRAM: ['']
      })
    }
  }

  onChangeTip() {
    this.tip = this.form.value.tip ? Number(this.form.value.tip) : 0
  }

  onChangeTipKomponente() {
    this.tipKomponente = this.form.value.tipKomponente ? this.form.value.tipKomponente : ''
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value
      
      const proizvodBase = {
        id: this.proizvodID,
        tip: value.tipKomponente,
        proizvodjac: value.proizvodjac,
        naziv: value.naziv,
        cena: value.cena,
        opis: value.opis
      }

      //this.store.select(selectSelectedProdavnica).pipe(
      //  filter(prodavnica => !!prodavnica),
      //  take(1),
      //  tap(prodavnica => proizvod.prodavnica = prodavnica)
      //).subscribe()

      console.log(proizvodBase)

      let proizvodData: any = {}

      switch (proizvodBase.tip) {
        case 'CPU':
          proizvodData = {
            ...proizvodBase,
            socket: value.socket,
            frekvencija: value.frekvencija
          };
          break;
        case 'GPU':
          proizvodData = {
            ...proizvodBase,
            frekvencija: value.frekvencija,
            VRAM: value.VRAM
          };
          break;
        default:
          proizvodData = proizvodBase;
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
