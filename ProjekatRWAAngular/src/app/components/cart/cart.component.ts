import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artikal } from '../../store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectCart, selectUkupnaCena } from '../../store/cart/cart.selectors';
import { CartItemComponent } from "./cart-item/cart-item.component";
import * as CartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor, CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit { 
  
  artikli$: Observable<Artikal[]> = of([])
  ukupnaCena$: Observable<number> = of(0)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.artikli$ = this.store.select(selectCart)
    this.ukupnaCena$ = this.store.select(selectUkupnaCena)
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart())
  }

}
