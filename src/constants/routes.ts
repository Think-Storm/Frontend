export const url = {
    base: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
};

export const apiRoutes = {
    signup: "/register",
    signin: "/login",
    subscribe: "/newsletter",
};

export const pageRoutes = {
    landing: "/",
    signup: "/signup",
    signin: "/signin",
    resetPassword: "/reset-password",
    dashboard: "/dashboard",
    explore: "/explore",
};
