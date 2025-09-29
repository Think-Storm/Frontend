import { defineConfig } from 'cypress'

const baseUrl = process.env.NEXT_PUBLIC_TEST_BASE_URL || 'http://localhost:3000'

export default defineConfig({
  e2e: {
    baseUrl,
    video: false,
    viewportWidth: 1200,
    viewportHeight: 1000,
    scrollBehavior: 'center',
    setupNodeEvents(on, config) {},
  },
  env: {
    baseUrl,
  },
})
