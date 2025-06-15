import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null
  user: User | null
  isLoggedIn: boolean
  error: any
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  isLoggedIn: false,
  error: null
}

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
    isLoggedIn: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false
  })),
  on(AuthActions.tokenIsValid, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true
  })),
  on(AuthActions.tokenIsInvalid, (state) => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false
  }))
)