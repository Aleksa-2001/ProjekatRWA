import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

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
    });
  }

  onInput() {
    this.formData = this.registerForm.value
  }

  onSubmit() {
    if (this.registerForm.valid && this.checkPasswordInputs(this.formData)) {
      const { repeatPassword, ...user } = this.formData
      console.log(user)
      //TODO: Dispatch-ovanje akcije za registraciju
    }
  }

  checkPasswordInputs(form: any) : boolean {
    if (form) return form.password === form.repeatPassword
    return false
  }

}
