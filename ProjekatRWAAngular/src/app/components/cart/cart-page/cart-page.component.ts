import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartComponent } from "../cart.component";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cart-page',
  imports: [CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  
  constructor(private title: Title) { }
  
  ngOnInit(): void {
    this.title.setTitle(`Korpa - ${ environment.appName}`)
  }

}
