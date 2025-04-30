import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Proizvod } from '../../../../models/proizvod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proizvod-item',
  imports: [RouterModule],
  templateUrl: './proizvod-item.component.html',
  styleUrl: './proizvod-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodItemComponent { 

  @Input() proizvod!: Proizvod

}
