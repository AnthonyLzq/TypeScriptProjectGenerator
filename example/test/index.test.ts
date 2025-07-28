describe('example', () => {
  describe('Main module', () => {
    test('should export expected functionality', () => {
      // Example test - replace with your actual tests
      const logSpy = jest.spyOn(console, 'log')

      require('../src')

      expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
      logSpy.mockRestore()
    })
  })
})
