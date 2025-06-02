import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export type User = any;

export interface AuthState {
  token: string | null;
  expiresAt: number | null
  user: User | null;
  error: any;
}

export const initialState: AuthState = {
  token: localStorage.getItem('token'),
  expiresAt: localStorage.getItem('expires_at') ? parseInt(localStorage.getItem('expires_at')!) : null,
  //user: localStorage.getItem('userID') ? { 
  //  userID: parseInt(localStorage.getItem('userID') ?? '0'), 
  //  admin: localStorage.getItem('admin') ? true : false,
  //  firstName: localStorage.getItem('firstName') ?? '', 
  //  lastName: localStorage.getItem('lastName') ?? '', 
  //  email: localStorage.getItem('email') ?? '', 
  //  username: localStorage.getItem('username') ?? '', 
  //  //password: ''
  //} : null,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, expiresAt, user }) => ({
    ...state,
    token,
    expiresAt,
    user,
    //user: { 
    //  userID: user.userID, 
    //  admin: user.admin,
    //  firstName: user.firstName,
    //  lastName: user.lastName,
    //  email: user.email,
    //  username: user.username, 
    //  //password: '' 
    //},
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
  })),
  on(AuthActions.tokenIsValid, (state, { user }) => ({
    ...state,
    user,
    //user: { 
    //  userID: user.userID, 
    //  admin: user.admin,
    //  firstName: user.firstName,
    //  lastName: user.lastName,
    //  email: user.email,
    //  username: user.username, 
    //  //password: '' 
    //},
    error: null
  })),
  on(AuthActions.tokenIsInvalid, (state, { error }) => ({
    ...state,
    token: null,
    expiresIn: null,
    user: null,
    error
  })),
  on(AuthActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user: { 
      userID: user.userID, 
      admin: user.admin,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username, 
      //password: '' 
    },
    error: null,
  }))
);