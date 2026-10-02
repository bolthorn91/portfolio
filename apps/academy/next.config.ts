import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@bolthorn/academy-content',
    '@bolthorn/academy-types',
    'monaco-editor',
  ],
}

export default nextConfig
