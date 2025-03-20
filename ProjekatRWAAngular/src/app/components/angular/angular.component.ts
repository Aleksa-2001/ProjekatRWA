import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RacunarskaKomponenta } from '../../models/racunarskaKomponenta';
import { CPU } from '../../models/cpu';
import { GPU } from '../../models/gpu';
import { RacunarskaKomponentaComponent } from "./racunarskeKomponente/RacunarskaKomponenta/RacunarskaKomponenta.component";
import { NgFor } from '@angular/common';
import { RacunarskaKomponentaService } from '../../services/RacunarskaKomponenta.service';

@Component({
  selector: 'app-angular',
  imports: [RacunarskaKomponentaComponent, NgFor],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent implements OnInit {

  komponente: Array<RacunarskaKomponenta> = new Array()
  cpu = new CPU(1, 'AMD', 'Ryzen 3 3200G', 21000, 'images/ng/komponente/3200g.jpg', 3.6, 4, 4)
  gpu = new GPU(2, 'nVidia', 'GeForce RTX 4090', 99999, 'images/ng/komponente/geforce-rtx-4090.jpg', 2.8, 16)

  constructor(private service: RacunarskaKomponentaService) { }

  ngOnInit(): void { 
    this.komponente.push(this.cpu)
    this.komponente.push(this.gpu)
  }

}
