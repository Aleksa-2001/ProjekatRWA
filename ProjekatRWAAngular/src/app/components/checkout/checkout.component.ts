import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { filter, Observable, of, take, tap } from 'rxjs';
import { selectCart, selectTotalItemCount, selectUkupnaCena } from '../../store/cart/cart.selectors';
import { Artikal } from '../../store/cart/cart.reducer';
import { CartComponent } from "../cart/cart.component";
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { CommonModule, NgIf } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { selectUser } from '../../store/auth/auth.selectors';
import { createOrder } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-checkout',
  imports: [NgIf, CommonModule, ReactiveFormsModule, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit { 

  addressForm!: FormGroup
  creditCardForm!: FormGroup

  user$: Observable<User | null> = of(null)
  adresaKorisnika: string = ''
  gradKorisnika: string = ''
  
  artikli$: Observable<Artikal[]> = of([])
  ukupnaCena$: Observable<number> = of(0)
  cartItemCount$: Observable<number> = of(0)

  adresaDostave: number = 1
  nacinPlacanja: number = 1

  constructor(private title: Title, private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.title.setTitle(`Plaćanje - ${ environment.appName}`)
    this.initAddressForm()
    this.initCCForm()

    this.artikli$ = this.store.select(selectCart)
    this.ukupnaCena$ = this.store.select(selectUkupnaCena)
    this.cartItemCount$ = this.store.select(selectTotalItemCount)
    
    this.user$ = this.store.select(selectUser)
    this.user$.pipe(
      filter(user => !!user),
      take(1),
      tap(user => {
        this.adresaKorisnika = user.address
        this.gradKorisnika = user.city
        this.fillAddressForm(this.adresaKorisnika, this.gradKorisnika)
      })
    ).subscribe()
  }

  initAddressForm() {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required]
    })

    this.adresaDostave = 2
  }

  initCCForm() {
    this.creditCardForm = this.fb.group({
      ccNumber: ['', Validators.required],
      ccExpMonth: ['', Validators.required],
      ccExpYear: ['', Validators.required],
      ccCVC: ['', Validators.required]
    })
  }

  fillAddressForm(adresa: string, grad: string) {
    this.addressForm.patchValue({
      address: adresa,
      city: grad
    })

    this.addressForm.get('address')!.disable()
    this.addressForm.get('city')!.disable()
    this.adresaDostave = 1
  }

  onSelectAdresa(value: number) {
    this.adresaDostave = value
    switch (value) {
      case 1: 
        this.fillAddressForm(this.adresaKorisnika, this.gradKorisnika)
        this.addressForm.get('address')!.disable()
        this.addressForm.get('city')!.disable()
        break
      case 2: 
        this.addressForm.reset()
        this.addressForm.get('address')!.enable()
        this.addressForm.get('city')!.enable()
        break
    }
  }

  onSelectNacinPlacanja(value: number) {
    this.nacinPlacanja = value
    if (value === 1) this.initCCForm()
  }

  isCCNumberValid(digits: string) {
    let sum = 0

    if (digits.length === 16) {
      for (let i = 0; i < digits.length; i++) {
        let cardNum = parseInt(digits[i])
        
        if ((digits.length - i) % 2 === 0) {
          cardNum = cardNum * 2

          if (cardNum > 9) {
            cardNum = cardNum - 9
          }
        }
        sum += cardNum;
      }
      return sum % 10 === 0
    }
    else return false
  }

  createOrder() {
    this.store.dispatch(createOrder())
  }

}
