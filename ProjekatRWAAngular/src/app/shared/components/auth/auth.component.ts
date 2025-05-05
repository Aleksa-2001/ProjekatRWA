import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import * as AuthActions from '../../../store/auth/auth.actions'
import { selectToken, selectError } from '../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-auth',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {  
  loginForm: FormGroup
  token$: Observable<string | null>
  error$: Observable<any>

  constructor(private title: Title, private fb: FormBuilder, private store: Store<AppState>) {
    this.title.setTitle("Prijava - ProjekatRWA")

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.token$ = this.store.select(selectToken)
    this.error$ = this.store.select(selectError)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.store.dispatch(AuthActions.login({ username, password }))      
    }
  }

}
