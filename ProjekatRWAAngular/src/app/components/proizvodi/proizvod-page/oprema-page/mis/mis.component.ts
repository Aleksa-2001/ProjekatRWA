import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Mis } from '../../../../../models/oprema/mis';

@Component({
  selector: 'app-mis',
  imports: [],
  templateUrl: './mis.component.html',
  styleUrl: './mis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MisComponent { 

  @Input() mis!: Mis

}
