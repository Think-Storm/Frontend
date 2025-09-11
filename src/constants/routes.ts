export const url = {
    base: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
};

export const apiRoutes = {
    signup: "/register",
    signin: "/login",
    subscribe: "/newsletter",
    getUser: (userId: number) => `/users/${userId}`,
    updateUser: "/users",
    profile: (profileId: number) => `/profiles/${profileId}`,
    updatePassword: "/update-password",
    forgotPassword: "/forgot-password",
};

export const pageRoutes = {
    landing: "/",
    signup: "/signup",
    signin: "/signin",
    resetPassword: "/reset-password",
    dashboard: "/dashboard",
    explore: "/explore",
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    settings: "/settings",
};
