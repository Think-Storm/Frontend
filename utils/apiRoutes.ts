export const url = {
  base: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
}

export const apiRoutes = {
  register: '/users',
  login: '/login',
}

export const pageRoutes = {
  main: '/',
  login: '/login',
  register: '/register',
}
