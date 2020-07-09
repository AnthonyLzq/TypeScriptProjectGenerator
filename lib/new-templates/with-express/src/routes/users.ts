import { Router } from 'express'
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
