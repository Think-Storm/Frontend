/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserSubscription {
  email: string;
}

export interface SignInData extends UserCredentials {}

export interface SignUpData extends UserCredentials {
  username: string;
}

export interface UserProfileData {
  avatar?: string;
  bio?: string;
  fullName?: string;
  birthdate?: string;
  preferredRole?: string[];
  location?: string;
  languages?: string[];
  technicalLabels?: string[];
  domainLabels?: string[];
  website?: string[];
  websiteType?: string[];
  timezone?: string;
}

export interface UpdateUserData {
  username: string;
  email: string;
}

export interface UpdateUserEmailData {
  email: string;
}

export interface UpdateUserPasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface SubscriptionData extends UserSubscription {}
