import { Application, Response, Request, Router, NextFunction } from 'express'
import { Home, User } from '../routes'
import { CustomError, ICustomError } from '../custom'
import { response } from '../utils'

const routers = [ User ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))

  // Handling 404 error
  app.use((req, res, next) => {
    const error = new CustomError('404 - Not Found')
    error.status = 404
    next(error)
  })
  app.use(
    (error: ICustomError, req: Request, res: Response, next: NextFunction) => {
      if (error.status === 404) response(true, error.message, res, error.status)

      next()
    }
  )
}

export { applyRoutes }

