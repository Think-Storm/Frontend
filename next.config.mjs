import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`,
    },
  ],
  images: {
    domains: ["dahee-natours-project.s3.us-east-1.amazonaws.com"],
  },
};

export default withNextIntl(nextConfig);
