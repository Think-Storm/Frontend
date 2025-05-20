export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignInData extends UserCredentials {}

export interface SignUpData extends UserCredentials {
  username: string;
}
