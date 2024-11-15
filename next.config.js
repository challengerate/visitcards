// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'http',
		  hostname: 'localhost',
		},
		{
		  protocol: 'https',
		  hostname: 'res.cloudinary.com',
		  pathname: '/dcvoxijdp/**',
		},
	  ],
	},
	experimental: {
	  serverComponentsExternalPackages: ['payload', 'sharp'],
	  runtime: 'nodejs',
	},
  };
  
  module.exports = nextConfig;