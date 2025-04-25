import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { CPU } from '../../../../models/komponente/cpu';

@Component({
  selector: 'app-cpu',
  imports: [],
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPUComponent implements OnInit {

  @Input() cpu?: CPU

  ngOnInit(): void {
    
  }

}
