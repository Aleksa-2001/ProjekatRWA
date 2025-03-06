import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  imports: [],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsComponent implements OnInit {

  ngOnInit(): void { }

}
