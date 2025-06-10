import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Proizvod } from '../../../../models/proizvod';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-proizvod-item',
  imports: [NgIf, CommonModule, RouterModule],
  templateUrl: './proizvod-item.component.html',
  styleUrl: './proizvod-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodItemComponent { 

  @Input() proizvod!: Proizvod
  @Input() displayMode!: number

}
