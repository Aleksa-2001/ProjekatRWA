import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Prodavnica } from '../../../../models/prodavnica';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { StarsComponent } from "../../stars/stars.component";

@Component({
  selector: 'app-prodavnica-item',
  imports: [NgIf, CommonModule, RouterModule, StarsComponent],
  templateUrl: './prodavnica-item.component.html',
  styleUrl: './prodavnica-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdavnicaItemComponent implements OnInit {

  @Input() prodavnica!: Prodavnica

  prosek: number = 0
  brojRecenzija: number = 0

  ngOnInit(): void {
    this.prosek = (this.prodavnica as any).prosecnaOcena ?? 0
    this.brojRecenzija = (this.prodavnica as any).brojRecenzija ?? 0
  }

}
