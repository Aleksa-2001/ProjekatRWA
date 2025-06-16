import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf, 
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  editProfileForm!: FormGroup
  formData: any

  editProfileMode: boolean = false

  user$: Observable<User | null>

  constructor(private title: Title, private store: Store<AppState>, private fb: FormBuilder) {
    this.title.setTitle("Profil - ProjekatRWA")
    this.user$ = this.store.select(selectUser).pipe(
      filter(user => !!user),
      tap(user => {
        this.editProfileForm = this.fb.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          username: [user.username, Validators.required],
          newPassword: ['', [Validators.required, Validators.minLength(8)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
        })
      })
    )
  }
  
  onInput() {
    this.formData = this.editProfileForm.getRawValue()
  }

  onChangeProfileOption(editMode: boolean) {
    this.editProfileMode = editMode
  }

  onSubmit() {
    if (this.editProfileForm.valid && this.checkPasswordInputs(this.formData)) {
      let { newPassword, repeatPassword, ...user } = this.formData
      user.password = this.formData.newPassword
      console.log(user)
      //TODO: Implementacija izmene profila
    }
  }

  checkPasswordInputs(form: any) : boolean {
    if (form) return form.newPassword === form.repeatPassword
    return false
  }

}
