import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Proizvod } from '../../../../models/proizvod';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { filter, Observable, of, take, tap } from 'rxjs';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { RacunarskaKomponenta } from '../../../../models/komponente/racunarska-komponenta';

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
  tipProizvoda: number = 0
  tipKomponente: number = 0

  @Input() title!: string
  proizvod$: Observable<Proizvod | null> = of()

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.title === 'Izmeni proizvod') {
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.proizvod$.pipe(
        filter(proizvod => !!proizvod),
        take(1),
        tap(proizvod => {
          this.tipProizvoda = proizvod.tip
          this.tipKomponente = (proizvod as RacunarskaKomponenta).tipKomponente.id

          this.form = this.fb.group({
            tip: [proizvod.tip, Validators.required],
            proizvodjac: [proizvod.proizvodjac, Validators.required],
            naziv: [proizvod.naziv, Validators.required],
            cena: [proizvod.cena, Validators.required],
            opis: [proizvod.opis],
            slika: [proizvod.slika],
            tipKomponente: [(proizvod as RacunarskaKomponenta).tipKomponente.id]
          })
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
        tipKomponente: ['']
      })
    }
  }

  onChangeTip() {
    this.tipProizvoda = this.form.value.tip ? Number(this.form.value.tip) : 0
  }

  onChangeTipKomponente() {
    this.tipKomponente = this.form.value.tipKomponente ? Number(this.form.value.tipKomponente) : 0
  }

  onSubmit() {
    if (this.form.valid) {
      const proizvod = this.form.value
      proizvod.id = -1
      proizvod.tip = this.tipProizvoda
      this.store.select(selectSelectedProdavnica).pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => proizvod.prodavnica = prodavnica)
      ).subscribe()
      console.log(proizvod)
      
    }
  }

}
