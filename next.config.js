/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

require('dotenv').config();
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  env: {
    ImApiUrl: process.env.NEXT_IM_API_URL,
    BaseApiUrl: process.env.NEXT_BASE_API_URL,
    WebappBaseUrl: process.env.NEXT_WEBAPP_BASE_URL,
    Auth0Domain: process.env.NEXT_AUTH0_DOMAIN,
    Auth0ClientID: process.env.NEXT_AUTH0_CLIENT_ID,
    PublicUrls: process.env.NEXT_PUBLIC_URLS
  },
  i18n
};

module.exports = nextConfig;
