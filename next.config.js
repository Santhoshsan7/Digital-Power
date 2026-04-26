/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', - Removed to enable dynamic API routes (emails, cancellations)
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
        ],
    },
}

module.exports = nextConfig
