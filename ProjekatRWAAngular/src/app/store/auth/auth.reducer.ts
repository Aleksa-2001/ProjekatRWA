import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null
  user: User | null
  error: any
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    user: null,
  })),
  on(AuthActions.tokenIsValid, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.tokenIsInvalid, (state) => ({
    ...state,
    token: null,
    user: null,
  }))
)