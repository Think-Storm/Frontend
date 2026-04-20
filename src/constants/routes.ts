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
      MY_PROJECTS: '/my-projects',
      PROJECT_DETAIL: (id: number) => `/projects/${id}`,
      PROFILE: (id: number) => `/profile/${id}`,
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
        BY_ID: (id: number) => `/projects/${id}`,
        LIKE: (id: number) => `/projects/${id}/like`,
        SAVE: (id: number) => `/projects/${id}/save`,
        UNSAVE: (id: number) => `/projects/${id}/unsave`,
        JOIN_REQUESTS: (id: number) => `/projects/${id}/join-requests`,
      },
    },
  },
} as const

export const protectedPages = ROUTES.PAGE.PROTECTED
