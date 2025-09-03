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

export interface UpdateUserProfileData {
  avatar?: string;
  bio?: string;
  fullName?: string;
  birthdate?: string;
  preferred_role?: string[];
  location?: string;
  languages?: string[];
  technical_labels?: string[];
  domain_labels?: string[];
  website?: string[];
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

export interface SubscriptionData extends UserSubscription {}
