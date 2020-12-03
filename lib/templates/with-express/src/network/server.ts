import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { applyRoutes } from './routes'

class Server {
  public app: express.Application
  private _connection: mongoose.Connection | undefined

  constructor () {
    this.app = express()
    this._config()
  }

  private _config () {
    this.app.set('port', process.env.PORT as string || '3000')
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        next()
      }
    )
    applyRoutes(this.app)
  }

  private async _mongo (): Promise<void> {
    this._connection = mongoose.connection
    const connection = {
      keepAlive         : true,
      useCreateIndex    : true,
      useFindAndModify  : false,
      useNewUrlParser   : true,
      useUnifiedTopology: true
    }
    this._connection.on('connected', () => {
      console.log('Mongo connection established.')
    })
    this._connection.on('reconnected', () => {
      console.log('Mongo connection reestablished')
    })
    this._connection.on('disconnected', () => {
      console.log('Mongo connection disconnected')
      console.log('Trying to reconnected to Mongo...')
      setTimeout(() => {
        mongoose.connect(process.env.MONGO_URI as string, {
          ...connection,
          connectTimeoutMS: 3000,
          socketTimeoutMS : 3000
        })
      }, 3000)
    })
    this._connection.on('close', () => {
      console.log('Mongo connection closed')
    })
    this._connection.on('error', (error: Error) => {
      console.log('Mongo connection error:')
      console.error(error)
    })
    await mongoose.connect(process.env.MONGO_URI as string, connection)
  }

  public start (): void {
    this.app.listen(this.app.get('port'), () =>
      console.log(`Server running at port ${this.app.get('port')}`)
    )
    /*
     * Uncomment the following piece of code once you have completed the mongo
     * uri in the .env file.
     */

    // try {
    //   this._mongo()
    // } catch (error) {
    //   console.error(error)
    // }
  }
}

const server = new Server()

export { server as Server }
