import {
  LoginUser,
  RegisterUser,
  UserResponse,
  ForgotPassword,
  ForgotUpdatePassword,
} from '@think-storm/contracts'
import { api } from '@/lib/api/fetcher'
import { ROUTES } from '@/constants/routes'

export interface LoginUserResponse {
  message: string
  data: UserResponse
}

export const signIn = (data: LoginUser) =>
  api.post<LoginUserResponse>(ROUTES.API.AUTH.SIGNIN, data)

export const signUp = (data: RegisterUser) =>
  api.post<UserResponse>(ROUTES.API.AUTH.SIGNUP, data)

export const forgotPassword = (data: ForgotPassword) =>
  api.post<void>(ROUTES.API.AUTH.RESET_PASSWORD, data)

export const resetPassword = (data: ForgotUpdatePassword) =>
  api.patch<void>(ROUTES.API.AUTH.RESET_PASSWORD, data)
