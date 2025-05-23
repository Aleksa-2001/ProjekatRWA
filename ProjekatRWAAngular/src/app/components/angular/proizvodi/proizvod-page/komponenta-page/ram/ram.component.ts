import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../../../../../models/racunarska-komponenta';
import { RAM } from '../../../../../../models/komponente/ram';

@Component({
  selector: 'app-ram',
  imports: [],
  templateUrl: './ram.component.html',
  styleUrl: './ram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RAMComponent implements OnInit {

  @Input() komponenta!: RacunarskaKomponenta
  ram!: RAM

  ngOnInit(): void {
    this.ram = <RAM>this.komponenta
  }

}
