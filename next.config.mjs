// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push("prisma");
        }
        return config;
    },
};