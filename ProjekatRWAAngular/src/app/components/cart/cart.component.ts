import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artikal } from '../../store/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectLoading, selectCart } from '../../store/cart/cart.selectors';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { CartItemComponent } from "./cart-item/cart-item.component";
import * as CartActions from '../../store/cart/cart.actions'

@Component({
  selector: 'app-cart',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    LoadingComponent,
    CartItemComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit { 
  
  loading$: Observable<boolean> = of(true)
  error$: Observable<any> = of(null)

  artikli$: Observable<Artikal[]> = of([])

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading)
    this.artikli$ = this.store.select(selectCart)
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart())
  }

}
