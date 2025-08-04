import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Artikal } from '../../../store/cart/cart.reducer';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {

  @Input() artikal!: Artikal

}
