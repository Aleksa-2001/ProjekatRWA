import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Artikal, maxKolicina } from '../../../store/cart/cart.reducer';
import { CommonModule, NgIf } from '@angular/common';
import { StarsComponent } from "../../stars/stars.component";
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { environment } from '../../../../environments/environment';
import * as CartActions from '../../../store/cart/cart.actions'

@Component({
  selector: 'app-cart-item',
  imports: [NgIf, CommonModule, RouterModule, StarsComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {

  apiUrl = environment.apiUrl
  maxKolicina = maxKolicina

  @Input() artikal!: Artikal
  @Input() checkout: boolean = false
  
  prosek: number = 0
  brojRecenzija: number = 0

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.prosek = (this.artikal.proizvod as any).prosecnaOcena ?? 0
    this.brojRecenzija = (this.artikal.proizvod as any).brojRecenzija ?? 0
  }

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
