import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProdavniceComponent } from "./prodavnice/prodavnice.component";
import { Title } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { isAdmin } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-angular',
  imports: [NgIf, CommonModule, ProdavniceComponent, DialogComponent],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

  isAdmin$: Observable<boolean> = of(false)

  constructor(private title: Title, private store: Store<AppState>) {
    this.isAdmin$ = this.store.select(isAdmin)
    this.title.setTitle("Angular - ProjekatRWA")
  }

}
