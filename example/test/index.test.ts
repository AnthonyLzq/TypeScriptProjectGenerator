describe('example tests', () => {
  test('Except src/index.ts to log "Thanks for using TPG!"', () => {
    const logSpy = jest.spyOn(console, 'log')

    require('../src')

    expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
  })
})
