export const url = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
}

export const ROUTES = {
  PAGE: {
    PUBLIC: {
      HOME: '/',
      PRIVACY_POLICY: '/privacy-policy',
      TERMS_OF_SERVICE: '/terms-of-service',
    },
    AUTH: {
      SIGNIN: '/signin',
      SIGNUP: '/signup',
      FORGOT_PASSWORD: '/forgot-password',
      CHECK_EMAIL: '/check-email',
      RESET_PASSWORD: {
        BASE: '/reset-password',
        SUCCESS: '/reset-password/success',
      },
    },
    PROTECTED: {
      EXPLORE: '/explore',
    },
  },
  API: {
    PUBLIC: {
      SUBSCRIBE: '/newsletter',
    },
    AUTH: {
      SIGNIN: '/login',
      SIGNUP: '/register',
      RESET_PASSWORD: '/forgot-password',
    },
    PROTECTED: {
      PROFILE: {
        BASE: '/profiles',
        BY_ID: (id: number) => `/profiles/${id}`,
      },
      PROJECTS: {
        BASE: '/projects',
        SEARCH: '/projects/search',
      },
    },
  },
} as const

export const protectedPages = ROUTES.PAGE.PROTECTED
