import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Base defaults to "/" (plain `npm run build`). The GitHub Pages workflow
// overrides this at build time with `--base=/GFP-PRESTART-2/` since the site
// is served from that subpath; every asset reference in the app is prefixed
// with import.meta.env.BASE_URL so either base works without further changes.
export default defineConfig({
  plugins: [react()],
})
