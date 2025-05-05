import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ProdavniceComponent } from "./prodavnice/prodavnice.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-angular',
  imports: [ProdavniceComponent],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

  constructor(private title: Title) {
    this.title.setTitle("Angular - ProjekatRWA")
  }

}
