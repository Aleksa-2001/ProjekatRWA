import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CPU } from '../../../../../models/komponente/cpu';

@Component({
  selector: 'app-cpu',
  imports: [],
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPUComponent {

  @Input() cpu!: CPU
  
}
