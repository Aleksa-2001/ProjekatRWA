import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recenzija } from '../../../../models/recenzija';
import { filter, Observable, of, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app-state';
import { Prodavnica } from '../../../../models/prodavnica';
import { Proizvod } from '../../../../models/proizvod';
import { NgClass, NgFor } from '@angular/common';
import { User } from '../../../../models/user';
import { selectUser } from '../../../../store/auth/auth.selectors';
import { selectSelectedProdavnica } from '../../../../store/prodavnica/prodavnica.selectors';
import { selectSelectedProizvod } from '../../../../store/proizvod/proizvod.selectors';
import { selectSelectedRecenzija } from '../../../../store/recenzija/recenzija.selectors';
import * as RecenzijeActions from '../../../../store/recenzija/recenzija.actions'

@Component({
  selector: 'app-recenzija-dialog',
  imports: [NgFor, NgClass, ReactiveFormsModule],
  templateUrl: './recenzija-dialog.component.html',
  styleUrl: './recenzija-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijaDialogComponent implements OnInit {

  form!: FormGroup
  
  @Input() modalID!: string
  @Input() mode: number = 0
  title: string = ""
  
  user$: Observable<User | null> = of()
  prodavnica$: Observable<Prodavnica | null> = of()
  proizvod$: Observable<Proizvod | null> = of()
  recenzija$: Observable<Recenzija | null> = of()

  recenzijaID: number = -1

  user: User | null = null
  prodavnica: Prodavnica | null = null
  proizvod: Proizvod | null = null
  
  formData?: FormData

  rating: readonly any[] = Array(5).fill(0)
  selectedOcena: number = 0
  prevSelectedOcena: number = 0

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ocena: ['', Validators.required],
      komentar: [''],
    })

    if (this.mode === 1) {
      this.title = 'Izmeni recenziju'

      this.recenzija$ = this.store.select(selectSelectedRecenzija)

      this.recenzija$.pipe(
        tap(recenzija => {
          if (recenzija) {
            this.recenzijaID = recenzija.id
            this.user = recenzija.user
            this.prodavnica = recenzija.prodavnica
            this.proizvod = recenzija.proizvod
            
            this.selectedOcena = recenzija.ocena
            this.prevSelectedOcena = recenzija.ocena

            this.form.patchValue({
              ocena: recenzija.ocena,
              komentar: recenzija.komentar,
            })
          }
          else {
            this.recenzijaID = -1
            this.resetForm()
          }
        })
      ).subscribe()
    }
    else {
      this.title = 'Dodaj recenziju'

      this.user$ = this.store.select(selectUser)
      this.prodavnica$ = this.store.select(selectSelectedProdavnica)
      this.proizvod$ = this.store.select(selectSelectedProizvod)

      this.user$.pipe(
        filter(user => !!user),
        take(1),
        tap(user => this.user = user)
      ).subscribe()

      this.prodavnica$.pipe(
        take(1),
        tap(prodavnica => this.prodavnica = prodavnica)
      ).subscribe()

      this.proizvod$.pipe(
        take(1),
        tap(proizvod => this.proizvod = proizvod)
      ).subscribe()
    }
  }

  onMouseEnter(index: number) {
    this.selectedOcena = index + 1
  }

  onMouseLeave() {
    if (this.prevSelectedOcena !== 0) this.selectedOcena = this.prevSelectedOcena
    else this.selectedOcena = 0
  }

  setRating(index: number) {
    this.prevSelectedOcena = index + 1
    this.form.controls['ocena'].setValue(index + 1)
  }

  resetForm() {
    this.form.reset()
    this.selectedOcena = 0
    this.prevSelectedOcena = 0
  }

  onCancel(): void {
    if (this.mode === 1) this.store.dispatch(RecenzijeActions.deselectSelectedItem())
    else this.resetForm()
  }

  onSubmit() {
    if (this.form.valid) {
      const recenzija = this.form.getRawValue()

      const recenzijaData = {
        id: this.recenzijaID,
        ocena: recenzija.ocena,
        komentar: recenzija.komentar ?? "",
        user: this.user ?? null,
        prodavnica: this.prodavnica ?? null,
        proizvod: this.proizvod ?? null
      }
      
      if (this.mode === 1) {
        this.store.dispatch(RecenzijeActions.updateItem({ selectedRecenzijaID: this.recenzijaID, selectedRecenzija: <Recenzija>recenzijaData }))
      }
      else {
        this.store.dispatch(RecenzijeActions.addItem({ recenzija: <Recenzija>recenzijaData }))
        this.resetForm()
      }
    }
  }

}
