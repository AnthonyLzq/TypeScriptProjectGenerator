const util = require('util')
const exec = util.promisify(require('child_process').exec)
const writeFile = require('../utils/writeFile')

/*
 * src
 * |- controllers:
 * |   |- user: content, file
 * |   |- index: content, file
 * |- custom:
 * |   |- error: content, file
 * |   |- global: content, file
 * |   |- response: content, file
 * |   |- request: content, file
 * |   |- index: content, file
 * |- dto-interfaces:
 * |   |- user: content, file
 * |   |- index: content, file
 * |- models:
 * |   |- user: content, file
 * |   |- index: content, file
 * |- network:
 * |   |- server: content, file
 * |   |- routes: content, file
 * |   |- index: content, file
 * |- routes:
 * |   |- home: content, file
 * |   |- user: content, file
 * |   |- index: content, file
 * |- utils:
 * |   |- response: content, file
 * |   |- index: content, file
 * |- .env: content, file
 * |- index: content, file
 */

module.exports = async () => {
  const data = {
    controllers:{
      user: {
        content: `import { DtoUser } from '../dto-interfaces'
import { IUser, UserModel } from '../models'

class User {
  private _args: DtoUser | null

  constructor (args: DtoUser | null = null) {
    this._args = args
  }

  process (
    type: string
  ):
    Promise<IUser[]> |
    Promise<IUser | null> |
    Promise<IUser> |
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

  private async _delete (): Promise<IUser | null> {
    const { id } = this._args as DtoUser
    try {
      const deletedUser = await UserModel.findOneAndDelete({ id })

      return deletedUser
    } catch (error) {
      console.error(error)
      throw new Error('There was an error trying to delete the requested user')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _deleteAll () {
    try {
      const deletedUsers = await UserModel.deleteMany({})

      return deletedUsers.ok
    } catch (error) {
      console.error(error)
      throw new Error('THere was an error trying to delete all the users.')
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async _getAll (): Promise<IUser[]> {
    try {
      const users = await UserModel.find({})

      return users
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to get all the users')
    }
  }

  private async _getOne (): Promise<IUser | null> {
    const { id } = this._args as DtoUser
    try {
      const user = await UserModel.findOne({ id })

      return user
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to get the requested user')
    }
  }

  private async _store (): Promise<IUser> {
    const { id, lastName, name } = this._args as DtoUser
    try {
      if (!lastName || !name) throw new Error('Name and last name are required')

      const newUser = new UserModel({ id, lastName, name })
      const result = await newUser.save()

      return result
    } catch (error) {
      console.error(error)
      throw new Error('There was a problem trying to store the user')
    }
  }

  private async _update (): Promise<IUser | null> {
    const { id, lastName, name } = this._args as DtoUser
    try {
      let updatedUser: IUser | null

      if (!lastName && !name)
        throw new Error('Name or last name must be provided.')
      else if (!lastName)
        updatedUser = await UserModel.findOneAndUpdate(
          { id },
          { name },
          { new: true }
        )
      else if (!name)
        updatedUser = await UserModel.findOneAndUpdate(
          { id },
          { lastName },
          { new: true }
        )
      else
        updatedUser = await UserModel.findOneAndUpdate(
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

export { User }
`,
        file: 'src/controllers/user.ts'
      },
      index: {
        content: `import { User } from './user'

export { User }
`,
        file: 'src/controllers/index.ts'
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
      index: {
        content: `import { Request } from './express.request'
import { Response } from './express.response'
import { CustomError, ICustomError } from './error'
import { CustomNodeJSGlobal } from './global.variables'

export {
  CustomError,
  CustomNodeJSGlobal,
  ICustomError,
  Response,
  Request
}
`,
        file: 'src/custom/index.ts'
      }
    },
    'dto-interfaces': {
      user: {
        content: `interface DtoUser {
  id       : string,
  lastName?: string,
  name    ?: string,
}

export { DtoUser }
`,
        file: 'src/dto-interfaces/users.dto.ts'
      },
      index: {
        content: `import { DtoUser } from './users.dto'

export { DtoUser }
`,
        file: 'src/dto-interfaces/index.ts'
      }
    },
    models: {
      user: {
        content: `import { Document, model, Schema } from 'mongoose'

interface IUser extends Document {
  id      : string,
  lastName: string,
  name    : string
}

const User = new Schema(
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
      type    : String
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const UserModel = model<IUser>('users', User)

export { IUser, UserModel }
`,
        file: 'src/models/user.ts'
      },
      index: {
        content: `import { IUser, UserModel } from './user'

export { IUser, UserModel }
`,
        file: 'src/models/index.ts'
      }
    },
    network: {
      routes: {
        content: `import { Application, Response, Request, Router, NextFunction } from 'express'
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
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
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
      },
      index: {
        content: `import { applyRoutes } from './routes'
import { Server } from './server'

export {
  applyRoutes,
  Server
}
`,
        file: 'src/network/index.ts'
      }
    },
    routes: {
      home: {
        content: `import { Response, Request, Router } from 'express'
import { response } from '../utils'

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
      user: {
        content: `import { Router } from 'express'
import { Response, Request } from '../custom'
import { response } from  '../utils'
import { User as UserC } from '../controllers/user'
import { DtoUser } from '../dto-interfaces'

const User = Router()

User.route('/users/')
  .get(async (req: Request, res: Response): Promise<void> => {
    const uc = new UserC()

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
    const uc = new UserC(args as DtoUser)

    try {
      const result = await uc.process('store')
      response(false, { result }, res, 201)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })
  .delete(async (req: Request, res: Response): Promise<void> => {
    const uc = new UserC()

    try {
      const result = await uc.process('deleteAll')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

User.route('/users/:userId')
  .get(async (req: Request, res: Response): Promise<void> => {
    const { params: { userId } } = req
    const dto = {
      id: userId
    }
    const uc = new UserC(dto as DtoUser)

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
    const uc = new UserC(dto as DtoUser)

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
    const uc = new UserC(dto as DtoUser)

    try {
      const result = await uc.process('delete')
      response(false, { result }, res, 200)
    } catch (error) {
      console.error(error)
      response(true, { message: error.message }, res, 500)
    }
  })

export { User }
`,
        file: 'src/routes/users.ts'
      },
      index: {
        content: `import { Home } from './home'
import { User } from './users'

export {
  Home,
  User
}
`,
        file: 'src/routes/index.ts'
      }
    },
    utils: {
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
        file: 'src/utils/response.ts'
      },
      index: {
        content: `import { response } from './response'

export { response }
`,
        file: 'src/utils/index.ts'
      }
    },
    '.env': {
      content: 'MONGO_URI = ',
      file   : '.env'
    },
    index: {
      content: `import { Server } from './network'

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
src/routes \
src/utils
`)

  await writeFile(data.controllers.user.file, data.controllers.user.content)
  await writeFile(data.controllers.index.file, data.controllers.index.content)

  await writeFile(data.custom.error.file, data.custom.error.content)
  await writeFile(data.custom.global.file, data.custom.global.content)
  await writeFile(data.custom.request.file, data.custom.request.content)
  await writeFile(data.custom.response.file, data.custom.response.content)
  await writeFile(data.custom.index.file, data.custom.index.content)

  await writeFile(
    data['dto-interfaces'].user.file,
    data['dto-interfaces'].user.content
  )
  await writeFile(
    data['dto-interfaces'].index.file,
    data['dto-interfaces'].index.content
  )

  await writeFile(data.models.user.file, data.models.user.content)
  await writeFile(data.models.index.file, data.models.index.content)

  await writeFile(data.network.routes.file, data.network.routes.content)
  await writeFile(data.network.server.file, data.network.server.content)
  await writeFile(data.network.index.file, data.network.index.content)

  await writeFile(data.routes.home.file, data.routes.home.content)
  await writeFile(data.routes.user.file, data.routes.user.content)
  await writeFile(data.routes.index.file, data.routes.index.content)

  await writeFile(data.utils.response.file, data.utils.response.content)
  await writeFile(data.utils.index.file, data.utils.index.content)

  await writeFile(data['.env'].file, data['.env'].content)

  await writeFile(data.index.file, data.index.content)
}