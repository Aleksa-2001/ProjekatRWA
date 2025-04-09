import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { KomponentaPageComponent } from "./racunarskeKomponente/KomponentaPage.component";

@Component({
  selector: 'app-angular',
  imports: [KomponentaPageComponent],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent implements OnInit {

  ngOnInit(): void { 

  }

}
