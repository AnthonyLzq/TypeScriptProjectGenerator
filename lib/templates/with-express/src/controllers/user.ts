import { DtoUser } from '../dto-interfaces'
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
