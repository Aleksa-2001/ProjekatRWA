import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from "../../../components/angular/dialog/confirm-dialog/confirm-dialog.component";
import { RecenzijeComponent } from "../../../components/angular/recenzije/recenzije.component";
import * as AuthActions from '../../../store/auth/auth.actions';
import * as RecenzijeActions from '../../../store/recenzija/recenzija.actions';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    RecenzijeComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  editProfileForm!: FormGroup
  formData: any

  changePasswordForm!: FormGroup
  passwordData: any

  displayMode: number = 1

  user$: Observable<User | null>
  userID: number = -1

  constructor(private title: Title, private store: Store<AppState>, private fb: FormBuilder) {
    this.title.setTitle("Profil - ProjekatRWA")
    this.user$ = this.store.select(selectUser).pipe(
      filter(user => !!user),
      tap(user => {
        this.editProfileForm = this.fb.group({
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          username: [user.username, Validators.required]
        })

        this.changePasswordForm = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(8)]],
          newPassword: ['', [Validators.required, Validators.minLength(8)]],
          repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
        })

        this.userID = user.userID
        this.formData = this.editProfileForm.getRawValue()
        
        this.store.dispatch(RecenzijeActions.loadItemsUser({ userID: this.userID }))
      })
    )
  }

  onChangeProfileOption(displayMode: number) {
    this.displayMode = displayMode
    if (displayMode === 1) this.title.setTitle("Profil - ProjekatRWA")
    if (displayMode === 2) this.title.setTitle("Recenzije - ProjekatRWA")
    if (displayMode === 3) this.title.setTitle("Izmeni Profil - ProjekatRWA")
  }
  
  onDataInput() {
    this.formData = this.editProfileForm.getRawValue()
  }

  checkDataInputs(user: User, form: any) {
    if (form) {
      const checkFirstName = user.firstName !== form.firstName
      const checklLastName = user.lastName !== form.lastName
      const checkEmail = user.email !== form.email
      const checkUsername = user.username !== form.username
      
      return checkFirstName || checklLastName || checkEmail || checkUsername
    }
    return false
  }

  onPasswordInput() {
    this.passwordData = this.changePasswordForm.getRawValue()
  }

  checkPasswordInputs(form: any) : boolean {
    if (form) {
      const passwordsMatch = this.checkPasswordsMatch(form)
      const passwordsAreEqual = this.checkPasswordsAreNotEqual(form)

      return passwordsMatch && passwordsAreEqual
    }
    return false
  }

  checkPasswordsMatch(form: any) {
    return form.newPassword === form.repeatPassword
  }

  checkPasswordsAreNotEqual(form: any) {
    return form.password !== form.newPassword || (form.password === '' && form.newPassword === '')
  }

  

  changeUser(user: User) {
    if (this.editProfileForm.valid && this.checkDataInputs(user, this.formData)) {
      this.store.dispatch(AuthActions.updateUser({ userID: this.userID, user: this.formData }))
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid && this.checkPasswordInputs(this.passwordData)) {
      const { repeatPassword, ...data } = this.passwordData
      this.store.dispatch(AuthActions.changePassword({ userID: this.userID, data: data }))
    }
  }

}
