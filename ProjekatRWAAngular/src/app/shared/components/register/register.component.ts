import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Observable } from 'rxjs';
import { selectError } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-register',
  imports: [NgIf, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  error$: Observable<any>

  registerForm: FormGroup
  formData: any

  constructor(private title: Title, private fb: FormBuilder, private store: Store<AppState>) {
    this.title.setTitle("Registracija - ProjekatRWA")
    
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
    })

    this.error$ = this.store.select(selectError)
  }

  onInput() {
    this.formData = this.registerForm.getRawValue()
  }

  onSubmit() {
    if (this.registerForm.valid && this.checkPasswordInputs(this.formData)) {
      const { repeatPassword, ...user } = this.formData
      this.store.dispatch(AuthActions.register({ user }))
    }
  }

  checkPasswordInputs(form: any) : boolean {
    if (form) return form.password === form.repeatPassword
    return false
  }

}
