
/** @type {import('next').NextConfig} */
const nextConfig = {
 // output: 'export', // Outputs a Single-Page Application (SPA)
  distDir: 'build', // Changes the build output directory to `build`
  reactStrictMode: true, // Enforces strict mode in React

  async redirects() {
    return [
      {
        source: "/manifest.json",
        destination: "/public/manifest.json",
        permanent: true,
      },
    ];
  },

  /*
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://host.docker.internal:3001/:path*', // Docker internal backend URL
        //destination: 'http://backend:3001/:path*',

        
      },
    ];
  },
  */

};


export default nextConfig
