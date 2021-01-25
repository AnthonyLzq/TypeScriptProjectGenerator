import { Router } from 'express'
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
