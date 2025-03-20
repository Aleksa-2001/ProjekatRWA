import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RacunarskaKomponentaComponent } from '../RacunarskaKomponenta/RacunarskaKomponenta.component';
import { GPU } from '../../../../models/gpu';

@Component({
  selector: 'app-gpu',
  imports: [],
  templateUrl: './GPU.component.html',
  styleUrl: './GPU.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPUComponent implements OnInit {

  @Input() gpu?: GPU

  ngOnInit(): void {
    
  }

}
