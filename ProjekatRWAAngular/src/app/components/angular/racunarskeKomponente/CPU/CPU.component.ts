import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { RacunarskaKomponentaComponent } from '../RacunarskaKomponenta/RacunarskaKomponenta.component';
import { CPU } from '../../../../models/cpu';

@Component({
  selector: 'app-cpu',
  imports: [],
  templateUrl: './CPU.component.html',
  styleUrl: './CPU.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPUComponent implements OnInit {

  @Input() cpu?: CPU

  ngOnInit(): void {
    
  }

}
