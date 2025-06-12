import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const login = createAction(
  '[Auth] Login',
  props<{ 
    username: string
    password: string 
  }>()
)

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ 
    token: string
  }>()
)

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ 
    error: any 
  }>()
)

export const register = createAction(
  '[Auth] Register',
  props<{
    user: User
  }>()
)

export const registerSuccess = createAction(
  '[Auth] Register Success'
)

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{
    error: any
  }>()
)

export const logout = createAction(
  '[Auth] Logout'
)

export const validateToken = createAction(
  '[Auth] Validate Token'
)

export const tokenIsValid = createAction(
  '[Auth] Token Is Valid',
  props<{
    user: User
  }>()
)

export const tokenIsInvalid = createAction(
  '[Auth] Token Is Invalid'
)

export const getUser = createAction(
  '[Auth] Load User',
  props<{
    token: string;
  }>()
)

export const getUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{
    user: User
  }>()
)