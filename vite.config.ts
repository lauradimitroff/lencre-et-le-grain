/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { writeSeoFiles } from './scripts/seo-files'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://lencre-et-le-grain.vercel.app'
  const outDir = fileURLToPath(new URL('./dist', import.meta.url))

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir,
      cssCodeSplit: true,
    },
    ssgOptions: {
      // Une page HTML pré-rendue par route : /librairie -> librairie.html
      dirStyle: 'flat',
      formatting: 'minify',
      script: 'async',
      onFinished: () => writeSeoFiles({ outDir, siteUrl }),
    },
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.spec.ts'],
    },
  }
})
