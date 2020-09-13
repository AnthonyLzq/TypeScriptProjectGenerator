import { Request } from 'express'
import { DtoUsers } from '../dto-interfaces/users.dto'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  args?: DtoUsers
}

export { CustomRequest as Request }
