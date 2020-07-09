import { DtoUsers } from '../dto-interfaces/users.dto'
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
