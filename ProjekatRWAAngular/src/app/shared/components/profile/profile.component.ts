import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { selectUser } from '../../../store/auth/auth.selectors';
import { CommonModule, NgIf } from '@angular/common';
import { UsersService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [NgIf, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {

  user$: Observable<User | null>

  constructor(private service: UsersService, private store: Store<AppState>, private route: ActivatedRoute) {
    const userID = this.route.snapshot.paramMap.get('userID')
    this.user$ = this.store.select(selectUser)
  }

}
