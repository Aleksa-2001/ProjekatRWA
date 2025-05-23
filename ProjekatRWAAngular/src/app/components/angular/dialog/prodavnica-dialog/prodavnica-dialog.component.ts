import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Prodavnica } from '../../../../models/prodavnica';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import * as ProdavniceActions from "../../../../store/prodavnica/prodavnica.actions"

@Component({
  selector: 'app-prodavnica-dialog',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './prodavnica-dialog.component.html',
  styleUrl: './prodavnica-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaDialogComponent implements OnInit { 

  form!: FormGroup
  formData: any

  @Input() title!: string
  prodavnica$: Observable<Prodavnica | null> = of()
  prodavnicaID: number = -1

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.title === 'Izmeni prodavnicu') {
      this.prodavnica$ = this.store.select(selectSelectedProdavnica)

      this.prodavnica$.pipe(
        filter(prodavnica => !!prodavnica),
        take(1),
        tap(prodavnica => {
          this.prodavnicaID = prodavnica.id
          this.form = this.fb.group({
            naziv: [prodavnica.naziv, Validators.required],
            adresa: [prodavnica.adresa, Validators.required],
            opis: [prodavnica.opis],
            slika: [prodavnica.slika]
          })
        })
      ).subscribe()
    }
    else {
      this.form = this.fb.group({
        naziv: ['', Validators.required],
        adresa: ['', Validators.required],
        opis: [''],
        slika: ['']
      })
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const prodavnica = this.form.value
      prodavnica.id = this.prodavnicaID
      if (this.title === 'Izmeni prodavnicu') {
        this.store.dispatch(ProdavniceActions.updateItem({ selectedProdavnicaID: prodavnica.id, selectedProdavnica: <Prodavnica>prodavnica }))
      }
      else {
        this.store.dispatch(ProdavniceActions.addItem({ prodavnica: <Prodavnica>prodavnica }))
      }
    }
  }

}
