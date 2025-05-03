import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Prodavnica } from '../../../../models/prodavnica';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prodavnica-item',
  imports: [RouterModule],
  templateUrl: './prodavnica-item.component.html',
  styleUrl: './prodavnica-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaItemComponent { 

  @Input() prodavnica!: Prodavnica

}
