/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
  rewrites: async () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
