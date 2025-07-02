import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  imports: [NgFor, NgClass, CommonModule],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsComponent {

  @Input() ocena!: number
  @Input() brojRecenzija: number = 0

  @Input() small: boolean = false
  @Input() prikaziBrojeve: boolean = false

  rating: readonly any[] = Array(5).fill(0)

  starHalf(i: number) {
    return Math.floor(this.ocena) === i && this.ocena - Math.floor(this.ocena) >= 0.5
  }

  starEmpty(i: number) {
    return Math.floor(this.ocena) === i && this.ocena - Math.floor(this.ocena) < 0.5
  }

}
