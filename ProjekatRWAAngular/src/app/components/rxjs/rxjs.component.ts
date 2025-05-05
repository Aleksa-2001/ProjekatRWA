import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rxjs',
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent {

  constructor(private title: Title) {
    this.title.setTitle("RxJS - ProjekatRWA")
  }

}
