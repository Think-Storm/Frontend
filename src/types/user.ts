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
  fullname?: string;
  technicalLabels?: string[];
  domainLabels?: string[];
  website?: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  timezone?: string;
}

export interface SubscriptionData extends UserSubscription {}
