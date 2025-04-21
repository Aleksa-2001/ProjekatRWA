import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user';

export interface AuthState {
  token: string | null;
  user: User | null;
  error: any;
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('userID') ? { 
    id: parseInt(localStorage.getItem('userID') ?? '0'), 
    firstName: '',//user.firstName,
    lastName: '',//user.lastName,
    email: '',//user.email,
    username: localStorage.getItem('username') ?? '', 
    password: ''
  } : null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user: { 
      id: user.id, 
      firstName: '',//user.firstName,
      lastName: '',//user.lastName,
      email: '',//user.email,
      username: user.username, 
      password: '' 
    },
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    user: null,
    error: null,
  }))
);