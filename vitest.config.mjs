import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Environment
    environment: 'node',

    // Files
    include: ['test/**/*.test.{js,mjs}'],

    // Timeout
    testTimeout: 240_000, // Para el test que crea un proyecto completo

    // Setup
    setupFiles: ['dotenv/config'],

    // Behavior
    globals: false, // Usar imports explícitos
    clearMocks: true,

    // Reporting
    reporter: ['verbose', 'json'],

    // Performance
    pool: 'forks', // Para procesos que manipulan archivos
    poolOptions: {
      forks: {
        singleFork: true // Ejecutar tests secuencialmente
      }
    }
  }
})
