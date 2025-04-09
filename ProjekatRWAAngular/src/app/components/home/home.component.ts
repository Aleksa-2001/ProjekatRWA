import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { selectAllComponents } from '../../store/komponente.selectors';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  constructor (private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.store.select(selectAllComponents)
  }

}
