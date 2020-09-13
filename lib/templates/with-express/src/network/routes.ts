import { Application, Router } from 'express'
import { Home } from '../routes/home'
import { Users } from '../routes/users'

const routers = [ Users ]

const applyRoutes = (app: Application): void => {
  app.use('/', Home)
  routers.forEach((router: Router): Application => app.use('/api', router))
}

export { applyRoutes }
