import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-original-images',
      closeBundle() {
        cpSync(resolve('images'), resolve('dist/images'), { recursive: true })
      }
    }
  ]
})
