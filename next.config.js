
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
}

export default nextConfig
