import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Zvucnik } from '../../../../../models/oprema/zvucnik';

@Component({
  selector: 'app-zvucnik',
  imports: [],
  templateUrl: './zvucnik.component.html',
  styleUrl: './zvucnik.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZvucnikComponent { 

  @Input() zvucnik!: Zvucnik

}
