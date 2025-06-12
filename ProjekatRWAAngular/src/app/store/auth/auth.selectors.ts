import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
)

export const isAuthenticated = createSelector(
  selectToken,
  (token) => !!token
)

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
)

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
)

export const isAdmin = createSelector(
  selectUser,
  (user) => <boolean>user?.admin ?? false
)

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
)