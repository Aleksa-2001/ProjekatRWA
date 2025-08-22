import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../../store/app-state';
import { selectPoruka, selectPrikaz, selectTipPoruke } from '../../../store/toast/toast.selectors';
import { hideToast } from '../../../store/toast/toast.actions';

@Component({
  selector: 'app-toast',
  imports: [NgClass, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit { 

  poruka$: Observable<string> = of('')
  tipPoruke$: Observable<string | null> = of(null)
  prikaziPoruku$: Observable<boolean> = of(false)

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.poruka$ = this.store.select(selectPoruka)
    this.tipPoruke$ = this.store.select(selectTipPoruke)
    this.prikaziPoruku$ = this.store.select(selectPrikaz)
  }

  close() {
    this.store.dispatch(hideToast())
  }

}
