/** @type {import('next').NextConfig} */
const path = require("path");
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.pexels.com", "lh3.googleusercontent.com", "res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "base.scss";`,
  },
};

module.exports = nextConfig;
