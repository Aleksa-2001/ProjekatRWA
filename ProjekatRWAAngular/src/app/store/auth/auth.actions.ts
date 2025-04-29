import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ 
    username: string; 
    password: string 
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ 
    token: string; 
    user: { 
      userID: number, 
      admin: boolean, 
      firstName: string, 
      lastName: string, 
      email: string, 
      username: string 
    }
  }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ 
    error: any 
  }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const getUser = createAction(
  '[Auth] Select User',
  props<{
    token: string;
  }>()
)

export const getUserSuccess = createAction(
  '[Auth] Select User Success',
  props<{
    user: { 
      userID: number, 
      admin: boolean, 
      firstName: string, 
      lastName: string, 
      email: string, 
      username: string 
    }
  }>()
)