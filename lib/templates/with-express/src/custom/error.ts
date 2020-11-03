interface ICustomError extends Error {
  status?: number
}

class CustomError extends Error {
  public status: number | undefined

  constructor (name: string, status?: number) {
    super(name)
    this.status = status
  }
}

export { CustomError, ICustomError }
