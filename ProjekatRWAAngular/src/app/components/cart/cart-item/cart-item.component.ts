import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Artikal, maxKolicina } from '../../../store/cart/cart.reducer';
import { CommonModule, NgIf } from '@angular/common';
import { StarsComponent } from "../../stars/stars.component";
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import * as CartActions from '../../../store/cart/cart.actions'

@Component({
  selector: 'app-cart-item',
  imports: [NgIf, CommonModule, RouterModule/*, StarsComponent*/],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {

  @Input() artikal!: Artikal
  maxKolicina = maxKolicina

  constructor(private store: Store<AppState>) { }

  increaseAmount(artikal: Artikal) {
    this.store.dispatch(CartActions.increaseAmount({ artikal }))
  }

  decreaseAmount(artikal: Artikal) {
    this.store.dispatch(CartActions.decreaseAmount({ artikal }))
  }

  removeFromCart(artikal: Artikal) {
    this.store.dispatch(CartActions.removeFromCart({ artikal }))
  }

}
