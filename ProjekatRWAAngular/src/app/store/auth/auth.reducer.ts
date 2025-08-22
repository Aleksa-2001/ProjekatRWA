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
  token: null,//localStorage.getItem('token'),
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
    isLoggedIn: true,
    error: null
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
    isLoggedIn: false,
    error: null
  })),
  on(AuthActions.tokenIsValid, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null
  })),
  on(AuthActions.tokenIsInvalid, (state) => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false
  })),
  on(AuthActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user: user.changes as User,
    error: null
  })),
  on(AuthActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.changePasswordSuccess, (state) => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false,
    error: null
  })),
  on(AuthActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.deleteUserSuccess, (state) => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false,
    error: null
  })),
  on(AuthActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
)