/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,
    },
};
