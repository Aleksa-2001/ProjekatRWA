import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProdavniceComponent } from "./prodavnice/prodavnice.component";
import { Title } from '@angular/platform-browser';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { isAdmin } from '../../store/auth/auth.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-angular',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    NgIf, 
    ProdavniceComponent, 
    DialogComponent
  ],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {

  isAdmin$: Observable<boolean> = of(false)

  searchForm!: FormGroup

  constructor(private title: Title, private router: Router, private fb: FormBuilder, private store: Store<AppState>) {
    this.isAdmin$ = this.store.select(isAdmin)
    this.title.setTitle("Angular - ProjekatRWA")

    this.searchForm = this.fb.group({
      inputSearch: ['', Validators.required]
    })
  }

  onSubmit() {
    const data = this.searchForm.value
    this.router.navigate(['ng/search'], { queryParams: { q: data.inputSearch } })
  }

}
