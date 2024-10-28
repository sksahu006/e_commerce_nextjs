/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com","prod-img.thesouledstore.com"],
  },
};

export default nextConfig;
