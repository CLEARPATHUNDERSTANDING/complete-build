/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // MANDATORY for App Hosting stability
  images: { unoptimized: true }, // Prevents image-processing timeouts
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Prevents clickjacking
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.googleapis.com;"
          }
        ],
      },
    ];
  },
};
module.exports = nextConfig;
