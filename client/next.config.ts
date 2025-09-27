import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    unoptimized: true, // For static exports if needed
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
