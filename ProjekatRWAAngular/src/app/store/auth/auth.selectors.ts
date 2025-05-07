import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const isAuthenticated = createSelector(
  selectToken,
  (token) => !!token
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const isAdmin = createSelector(
  selectUser,
  (state) => <boolean>state?.admin ?? false
)

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);