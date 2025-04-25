import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { GPU } from '../../../../models/komponente/gpu';

@Component({
  selector: 'app-gpu',
  imports: [],
  templateUrl: './gpu.component.html',
  styleUrl: './gpu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPUComponent implements OnInit {

  @Input() gpu?: GPU

  ngOnInit(): void {
    
  }

}
