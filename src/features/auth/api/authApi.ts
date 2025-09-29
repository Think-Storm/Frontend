import { LoginUser, RegisterUser, UserResponse } from '@think-storm/contracts'
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
