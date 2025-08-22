import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
import { Update } from '@ngrx/entity';

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

export const getUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{
    error: any
  }>()
)

export const updateUser = createAction(
  '[Auth] Update User', 
  props<{
    userID: number,
    user: User
  }>()
)

export const updateUserSuccess = createAction(
  '[Auth] Update User Success',
  props<{
    user: Update<User>
  }>()
)

export const updateUserFailure = createAction(
  '[Auth] Update User Failure',
  props<{
    error: any
  }>()
)

export const changePassword = createAction(
  '[Auth] Change Password',
  props<{
    userID: number,
    data: {
      password: string,
      newPassword: string
    }
  }>()
)

export const changePasswordSuccess = createAction(
  '[Auth] Change Password Success'
)

export const changePasswordFailure = createAction(
  '[Auth] Change Password Failure',
  props<{
    error: any
  }>()
)

export const deleteUser = createAction(
  '[Auth] Delete User',
  props<{
    userID: number
  }>()
)

export const deleteUserSuccess = createAction(
  '[Auth] Delete User Success',
  props<{
    userID: number
  }>()
)

export const deleteUserFailure = createAction(
  '[Auth] Delete User Failure',
  props<{
    error: any
  }>()
)
