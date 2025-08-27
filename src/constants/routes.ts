export const url = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
};

export const ROUTES = {
  PAGE: {
    PUBLIC: {
      HOME: "/",
      SUBSCRIBE: "/newsletter",
    },
    AUTH: {
      SIGNIN: "/signin",
      SIGNUP: "/signup",
      RESET_PASSWORD: "/reset-password",
    },
    PROTECTED: {
      ONBOARDING: "/onboarding",
      DASHBOARD: "/dashboard",
      EXPLORE: "/explore",
    },
  },
  API: {
    PUBLIC: {},
    AUTH: {
      SIGNIN: "/login",
      SIGNUP: "/register",
    },
    PROTECTED: {
      PROFILE: {
        BASE: "/profiles",
        BY_ID: (id: number) => `/profiles/${id}`,
      },
    },
  },
} as const;

// API routes for useSubscribe and other API calls
export const apiRoutes = {
  subscribe: "/api/subscribe",
  signin: "/api/auth/signin",
  signup: "/api/auth/signup",
  profile: "/api/profile",
} as const;

// Page routes for navigation
export const pageRoutes = {
  landing: "/",
  signin: "/signin",
  signup: "/signup",
  dashboard: "/dashboard",
  explore: "/explore",
  onboarding: "/onboarding",
} as const;

export const protectedPages = ROUTES.PAGE.PROTECTED;
