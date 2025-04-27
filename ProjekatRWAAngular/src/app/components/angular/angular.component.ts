import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ProdavniceComponent } from "./prodavnice/prodavnice.component";

@Component({
  selector: 'app-angular',
  imports: [ProdavniceComponent],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

}
