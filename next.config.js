/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Old pages that were removed — redirect to fix GSC 404s
      { source: '/about', destination: '/', permanent: true },
      { source: '/cookie-policy', destination: '/privacy', permanent: true },
      { source: '/tools/income-tax-calculator', destination: '/tools/tax-calculator', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
