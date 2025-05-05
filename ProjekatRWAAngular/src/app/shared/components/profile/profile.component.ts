import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { UsersService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  imports: [NgIf, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  user$: Observable<User | null>

  constructor(private title: Title, private store: Store<AppState>) {
    this.title.setTitle("Profil - ProjekatRWA")

    this.user$ = this.store.select(selectUser)
  }

}
