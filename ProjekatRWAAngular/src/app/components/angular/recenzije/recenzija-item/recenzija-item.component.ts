import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recenzija } from '../../../../models/recenzija';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-recenzija-item',
  imports: [NgIf, CommonModule],
  templateUrl: './recenzija-item.component.html',
  styleUrl: './recenzija-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijaItemComponent { 

  @Input() recenzija!: Recenzija

}
