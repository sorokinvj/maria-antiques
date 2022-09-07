import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true
  },
  requestTimeout: 20000,
  env: {
    NODE_ENV: 'test'
  }
})
