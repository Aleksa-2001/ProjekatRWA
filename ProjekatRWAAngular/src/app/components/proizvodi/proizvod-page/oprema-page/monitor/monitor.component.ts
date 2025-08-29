import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Monitor } from '../../../../../models/oprema/monitor';

@Component({
  selector: 'app-monitor',
  imports: [],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent { 

  @Input() monitor!: Monitor

}
