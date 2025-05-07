import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Proizvod } from '../../../../models/proizvod';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-dodaj-proizvod-dialog',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './dodaj-proizvod-dialog.component.html',
  styleUrl: './dodaj-proizvod-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DodajProizvodDialogComponent {

  form: FormGroup
  formData: any
  tipProizvoda: number = 0
  tipKomponente: number = 0

  @Input() title?: string
  @Input() proizvod?: Proizvod | null

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
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
