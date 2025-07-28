import { describe, expect, it, vi } from 'vitest'

describe('example', () => {
  describe('Main module', () => {
    it('should export expected functionality', async () => {
      // Example test - replace with your actual tests
      const logSpy = vi.spyOn(console, 'log')

      await import('../src')

      expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
      logSpy.mockRestore()
    })
  })
})
