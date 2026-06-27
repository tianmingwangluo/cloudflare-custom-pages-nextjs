/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
};

const devConfig = {
  ...baseConfig,
};

const prodConfig = {
  ...baseConfig,
  output: "export",
  productionBrowserSourceMaps: false,
};

module.exports = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
