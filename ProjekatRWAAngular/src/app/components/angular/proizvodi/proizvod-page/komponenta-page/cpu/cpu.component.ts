import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../../../models/komponente/racunarska-komponenta';
import { CPU } from '../../../../../../models/komponente/cpu';

@Component({
  selector: 'app-cpu',
  imports: [],
  templateUrl: './cpu.component.html',
  styleUrl: './cpu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CPUComponent implements OnInit {

  @Input() komponenta!: RacunarskaKomponenta
  cpu!: CPU

  ngOnInit(): void {
    this.cpu = <CPU>this.komponenta
  }
}
