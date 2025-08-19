import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Recenzija } from '../../../models/recenzija';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { isAdmin, selectUser } from '../../../store/auth/auth.selectors';
import { User } from '../../../models/user';
import { StarsComponent } from "../../stars/stars.component";
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions'

@Component({
  selector: 'app-recenzija-item',
  imports: [NgIf, CommonModule, RouterModule, StarsComponent],
  templateUrl: './recenzija-item.component.html',
  styleUrl: './recenzija-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecenzijaItemComponent implements OnInit {
  
  user$: Observable<User | null> = of()
  isAdmin$: Observable<boolean> = of(false)

  @Input() recenzija!: Recenzija
  @Input() profileMode!: boolean

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser)
    this.isAdmin$ = this.store.select(isAdmin)
  }

  selectRecenzija(recenzijaID: number) {
    this.store.dispatch(RecenzijeActions.setSelectedItemID({ recenzijaID: recenzijaID }))
    this.store.dispatch(RecenzijeActions.loadSelectedItem({ selectedRecenzijaID: recenzijaID }))
  }

  prikaziVreme(vreme: Date) : string {
    let trenutnoVreme = new Date()
    vreme = new Date(vreme)

    let razlika = Date.UTC(
      trenutnoVreme.getFullYear(), 
      trenutnoVreme.getMonth(), 
      trenutnoVreme.getDate(), 
      trenutnoVreme.getHours(), 
      trenutnoVreme.getMinutes(), 
      trenutnoVreme.getSeconds()
    ) - Date.UTC(
      vreme.getFullYear(), 
      vreme.getMonth(), 
      vreme.getDate(),
      vreme.getHours(), 
      vreme.getMinutes(), 
      vreme.getSeconds()
    )
    
    let sekundi = Math.floor(razlika / 1000)
    let minuti = Math.floor(sekundi / 60)
    let sati = Math.floor(minuti / 60)
    let dani = Math.floor(sati / 24)
    let meseci = Math.floor(dani / 30)
    let godine = Math.floor(meseci / 12)

    if (godine > 0) {
      if (godine == 1) return "pre godinu dana"
      return `pre ${godine} godin${godine >= 5 ? 'a' : 'e'}`
    }
    if (meseci > 0) {
      if (meseci == 1) return "pre mesec dana"
      return `pre ${meseci} mesec${meseci >= 5 ? 'i' : 'a'}`
    }
    if (dani > 0) {
      if (dani == 1) return "juče"
      return `pre ${dani} dan${dani != 21 ? 'a' : ''}`
    }
    if (sati > 0) {
      if (sati == 1) return "pre sat vremena"
      if (sati < 5 || sati > 21) return `pre ${sati} sata`
      return `pre ${sati} sat${sati != 21 ? 'i' : ''}`
    }
    if (minuti > 0) return `pre ${minuti} minut${minuti % 10 != 1 || minuti == 11 ? 'a' : ''}`
    if (sekundi > 0) return `pre ${sekundi} sekund${(sekundi % 10 >= 5 || sekundi % 10 == 0) || (sekundi >= 11 && sekundi <= 14) ? 'i' : 'e'}`
    return "upravo sada"
  }

}
