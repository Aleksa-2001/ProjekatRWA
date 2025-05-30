import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RAM } from '../../../../../../models/komponente/ram';

@Component({
  selector: 'app-ram',
  imports: [],
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RAMComponent {

  @Input() ram!: RAM

}
