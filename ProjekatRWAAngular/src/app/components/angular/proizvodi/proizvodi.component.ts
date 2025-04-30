import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProizvodItemComponent } from './proizvod-item/proizvod-item.component';
import { Observable, of } from 'rxjs';
import { Proizvod } from '../../../models/proizvod';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import * as ProizvodiActions from '../../../store/proizvod/proizvod.actions'
import { selectProizvodi } from '../../../store/proizvod/proizvod.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proizvodi',
  imports: [NgFor, CommonModule, ProizvodItemComponent],
  templateUrl: './proizvodi.component.html',
  styleUrl: './proizvodi.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProizvodiComponent { 

  //@Input() prodavnicaID!: number
  prodavnicaID: number
  proizvodi: Observable<readonly Proizvod[]> = of([])
  
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { 
    this.prodavnicaID = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(ProizvodiActions.loadItems({ prodavnicaID: this.prodavnicaID }))
    this.proizvodi = this.store.select(selectProizvodi)
  }

}
