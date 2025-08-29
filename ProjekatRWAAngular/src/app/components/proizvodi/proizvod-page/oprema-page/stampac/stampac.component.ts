import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Stampac } from '../../../../../models/oprema/stampac';

@Component({
  selector: 'app-stampac',
  imports: [],
  templateUrl: './stampac.component.html',
  styleUrl: './stampac.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StampacComponent { 

  @Input() stampac!: Stampac

}
