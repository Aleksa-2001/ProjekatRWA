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

  rating: any = Array(5).fill(0)
  prosek: number = 0
  brojRecenzija: number = 0

  ngOnInit(): void {
    this.prosek = (this.proizvod as any).prosecnaOcena ?? 0
    this.brojRecenzija = (this.proizvod as any).brojRecenzija ?? 0
  }

  starHalf(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) >= 0.5
  }

  starEmpty(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) < 0.5
  }

}
