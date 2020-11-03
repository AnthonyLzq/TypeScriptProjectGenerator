const util = require('util')
const exec = util.promisify(require('child_process').exec)
const writeFile = require('../utils/writeFile')

/*
 * src
 * |- controllers:
 * |   |- users: content, file
 * |- custom:
 * |   |- error: content, file
 * |   |- global: content, file
 * |   |- response: content, file
 * |   |- request: content, file
 * |- dto-interfaces:
 * |   |- users: content, file
 * |- models:
 * |   |- users: content, file
 * |- network:
 * |   |- server: content, file
 * |   |- routes: content, file
 * |   |- response: content, file
 * |- routes:
 * |   |- home: content, file
 * |   |- users: content, file
 * |- .env: content, file
 * |- index: content, file
 */

module.exports = async () => {
  const data = {
    controllers:{
      users: {
        content: `import { DtoUsers } from '../dto-interfaces/users.dto'
import { IUsers, UsersModel } from '../models/users'

class Users {
  private _args: DtoUsers | null

  constructor (args: DtoUsers | null = null) {
    this._args = args
  }

  process (
    type: string
  ):
    Promise<IUsers[]> |
    Promise<IUsers | null> |
    Promise<IUsers> |
    Promise<number | undefined> |
    undefined {
    switch (type) {
      case 'delete':
        return this._delete()
      case 'deleteAll':
        return this._deleteAll()
      case 'getAll':
        return this._getAll()
      case 'getOne':
        return this._getOne()
      case 'store':
        return this._store()
      case 'update':
        return this._update()
      default:
        return undefined
    }
  }

  private async _delete (): Promise<IUsers | null> {
    const { id } = this._args as DtoUsers
    try {
      const deletedUser = await UsersModel.findOneAndDelete({ id })

      return deletedUser
    } catch (error) {
      console.error(error)
      throw new Error('There was an error trying to delete the requested user')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _deleteAll () {
    try {
      const deletedUsers = await UsersModel.deleteMany({})

      return deletedUsers.ok
    } catch (error) {
      console.error(error)
      throw new Error('THere was an error trying to delete all the users.')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll (): Promise<IUsers[]> {
    try {
      const users = await UsersModel.find({})

      return users
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to get all the users')
    }
  }

  private async _getOne (): Promise<IUsers | null> {
    const { id } = this._args as DtoUsers
    try {
      const user = await UsersModel.findOne({ id })

      return user
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested user')
    }
  }

  private async _store (): Promise<IUsers> {
    const { id, lastName, name } = this._args as DtoUsers
    try {
      if (!lastName || !name) throw new Error('Name and last name are required')

      const newUser = new UsersModel({ id, lastName, name })
      const result = await newUser.save()

      return result
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to store the user')
    }
  }

  private async _update (): Promise<IUsers | null> {
    const { id, lastName, name } = this._args as DtoUsers
    try {
      let updatedUser: IUsers | null

      if (!lastName && !name)
        throw new Error('Name or last name must be provided.')
      else if (!lastName)
        updatedUser = await UsersModel.findOneAndUpdate(
          { id },
          { name },
          { new: true }
        )
      else if (!name)
        updatedUser = await UsersModel.findOneAndUpdate(
          { id },
          { lastName },
          { new: true }
        )
      else
        updatedUser = await UsersModel.findOneAndUpdate(
          { id },
          { lastName, name },
          { new: true }
        )

      return updatedUser
    } catch (error) {
      if (error.message === 'Name or last name must be provided.')
        throw error
      else {
        console.error(error)
        throw new Error('There was a problem trying to update the requested user')
      }
    }
  }
}

export { Users }
`,
        file: 'src/controllers/users.ts'
      }
    },
    custom: {
      error: {
        content: `interface ICustomError extends Error {
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
`,
        file: 'src/custom/error.ts'
      },
      global: {
        content: `interface CustomNodeJSGlobal extends NodeJS.Global {
  myGlobalVariable: unknown
}

export { CustomNodeJSGlobal }
`,
        file: 'src/custom/global.variables.ts'
      },
      response: {
        content: `import { Response } from 'express'

/*
 * With this piece of code we ca personalize the attributes of the response,
 * in case we need it.
 */

interface CustomResponse extends Response {
  newValue?: string
}

export { CustomResponse as Response }
`,
        file: 'src/custom/express.response.ts'
      },
      request: {
        content: `import { Request } from 'express'
import { DtoUsers } from '../dto-interfaces/users.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  args?: DtoUsers
}

export { CustomRequest as Request }
`,
        file: 'src/custom/express.request.ts',
      },
    },
    'dto-interfaces': {
      users: {
        content: `export interface DtoUsers {
  id       : string,
  lastName?: string,
  name    ?: string,
}
`,
        file: 'src/dto-interfaces/users.dto.ts'
      }
    },
    models: {
      users: {
        content: `import { Document, model, Schema } from 'mongoose'

interface IUsers extends Document {
  id      : string,
  lastName: string,
  name    : string
}

const Users = new Schema(
  {
    id: {
      required: true,
      type    : String,
      unique  : true
    },
    lastName: {
      required: true,
      type    : String
    },
    name: {
      required: true,
      type    : String,
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const UsersModel = model<IUsers>('users', Users)

export { IUsers, UsersModel }
`,
        file: 'src/models/users.ts'
      }
    },
    network: {
      response: {
        content: `import { Response } from 'express'

const response = (
  error  : boolean,
  message: Record<string, unknown> | string,
  res    : Response,
  status : number
): void => {
  res.status(status).send({ error, message })
}

export { response }
`,
        file: 'src/network/response.ts'
      },
      routes: {
        content: `import { Application, Response, Request, Router, NextFunction } from 'express'
import { Home } from '../routes/home'
import { Users } from '../routes/users'
import { CustomError, ICustomError } from '../custom/error'
import { response } from './response'

const routers = [ Users ]

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
`,
        file: 'src/network/routes.ts'
      },
      server: {
        content: `import express from 'express'
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
        res.header('Access-Control-Allow-Methods, 'GET, POST')
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
      console.log(\`Server running at port \${this.app.get('port')}\`)
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
`,
        file: 'src/network/server.ts'
      }
    },
    routes: {
      home: {
        content: `import { Response, Request, Router } from 'express'
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
`,
        file: 'src/routes/home.ts'
      },
      users: {
        content: `import { Router } from 'express'
import { Response } from '../custom/express.response'
import { Request } from '../custom/express.request'
import { response } from  '../network/response'
import { Users as UsersC } from '../controllers/users'
import { DtoUsers } from '../dto-interfaces/users.dto'

const Users = Router()

Users.route('/users/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const uc = new UsersC()

    try {
      const result = await uc.process('getAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .post(async (req: Request, res: Response): Promise<void> => {
    const { body: { args } } = req
    const uc = new UsersC(args as DtoUsers)

    try {
      const result = await uc.process('store')
      response(false, { result }, res, 201)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .delete(async (req: Request, res: Response): Promise<void> => {
    const uc = new UsersC()

    try {
      const result = await uc.process('deleteAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

Users.route('/users/:userId')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { userId } } = req
    const dto = {
      id: userId
    }
    const uc = new UsersC(dto as DtoUsers)

    try {
      const result = await uc.process('getOne')
      response(false, { result }, res, 200)
    } catch (error) {
      console.log(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .patch(async (req: Request, res: Response): Promise<void> => {
    const { body: { args: { lastName, name } }, params: { userId } } = req
    const dto = {
      id: userId,
      lastName,
      name
    }
    const uc = new UsersC(dto as DtoUsers)

    try {
      const result = await uc.process('update')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .delete(async (req: Request, res: Response): Promise<void> => {
    const { params: { userId } } = req
    const dto = { id: userId }
    const uc = new UsersC(dto as DtoUsers)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { Users }
`,
        file: 'src/routes/users.ts'
      }
    },
    '.env': {
      content: 'MONGO_URI=',
      file   : '.env'
    },
    index: {
      content: `import { Server } from './network/server'

Server.start()
`,
      file: 'src/index.ts',
    }
  }

  await exec(`mkdir src \
src/controllers \
src/custom \
src/dto-interfaces \
src/models \
src/network \
src/routes
`)

  await writeFile(data.controllers.users.file, data.controllers.users.content)
  await writeFile(data.custom.error.file, data.custom.error.content)
  await writeFile(data.custom.global.file, data.custom.global.content)
  await writeFile(data.custom.request.file, data.custom.request.content)
  await writeFile(data.custom.response.file, data.custom.response.content)
  await writeFile(
    data['dto-interfaces'].users.file,
    data['dto-interfaces'].users.content
  )
  await writeFile(data.models.users.file, data.models.users.content)
  await writeFile(data.network.response.file, data.network.response.content)
  await writeFile(data.network.routes.file, data.network.routes.content)
  await writeFile(data.network.server.file, data.network.server.content)
  await writeFile(data.routes.home.file, data.routes.home.content)
  await writeFile(data.routes.users.file, data.routes.users.content)
  await writeFile(data['.env'].file, data['.env'].content)
  await writeFile(data.index.file, data.index.content)
}