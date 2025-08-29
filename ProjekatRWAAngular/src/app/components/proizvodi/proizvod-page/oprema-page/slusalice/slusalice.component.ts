import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Slusalice } from '../../../../../models/oprema/slusalice';

@Component({
  selector: 'app-slusalice',
  imports: [],
  templateUrl: './slusalice.component.html',
  styleUrl: './slusalice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlusaliceComponent { 

  @Input() slusalice!: Slusalice

}
