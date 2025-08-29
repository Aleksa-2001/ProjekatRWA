import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Tastatura } from '../../../../../models/oprema/tastatura';

@Component({
  selector: 'app-tastatura',
  imports: [],
  templateUrl: './tastatura.component.html',
  styleUrl: './tastatura.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TastaturaComponent { 

  @Input() tastatura!: Tastatura

}
