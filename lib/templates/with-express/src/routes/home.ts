import { Response, Request, Router } from 'express'
import { response } from '../network/response'

const Home = Router()

Home.route('')
  .get((req: Request, res: Response) => {
    response(
      false,
      'Welcome to your Express Backend!',
      res,
      200
    )
  })

export { Home }
