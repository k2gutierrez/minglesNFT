/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io'
            },
            {
                protocol: 'https',
                hostname: 'd9emswcmuvawb.cloudfront.net'
            }
        ]
    }
};

export default nextConfig;
