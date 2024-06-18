/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vztcqdwwinxdbflfwwjv.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'technoc.ir',
            },
            {
                protocol: 'https',
                hostname: 'gadgetnews.net',
            },
        ],
    },
};

export default nextConfig;
