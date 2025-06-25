import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Prodavnica } from '../../../../models/prodavnica';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-prodavnica-item',
  imports: [NgIf, NgFor, CommonModule, RouterModule],
  templateUrl: './prodavnica-item.component.html',
  styleUrl: './prodavnica-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaItemComponent implements OnInit {

  @Input() prodavnica!: Prodavnica

  rating: any = Array(5).fill(0)
  prosek: number = 0
  brojRecenzija: number = 0

  ngOnInit(): void {
    this.prosek = (this.prodavnica as any).prosecnaOcena ?? 0
    this.brojRecenzija = (this.prodavnica as any).brojRecenzija ?? 0
  }

  starHalf(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) >= 0.5
  }

  starEmpty(i: number) {
    return Math.floor(this.prosek) === i && this.prosek - Math.floor(this.prosek) < 0.5
  }

}
