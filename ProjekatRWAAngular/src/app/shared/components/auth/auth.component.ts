import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import * as AuthActions from '../../../store/auth/auth.actions'
import { selectToken } from '../../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {

  loginForm: FormGroup
  token$: Observable<string | null>

  constructor(private fb: FormBuilder, private store: Store<AppState>, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.token$ = this.store.select(selectToken)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value
      this.store.dispatch(AuthActions.login({ username, password }))
    }
  }

}
