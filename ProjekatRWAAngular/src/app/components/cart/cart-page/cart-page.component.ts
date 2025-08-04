import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartComponent } from "../cart.component";
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';

@Component({
  selector: 'app-cart-page',
  imports: [CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {

  constructor(private title: Title, private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.title.setTitle("Korpa - ProjekatRWA")
  }

}
