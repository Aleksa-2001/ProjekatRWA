import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../../../models/racunarska-komponenta';
import { GPU } from '../../../../../../models/komponente/gpu';

@Component({
  selector: 'app-gpu',
  imports: [],
  templateUrl: './gpu.component.html',
  styleUrl: './gpu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPUComponent implements OnInit {

  @Input() komponenta!: RacunarskaKomponenta
  gpu!: GPU

  ngOnInit(): void {
    this.gpu = <GPU>this.komponenta
  }

}
