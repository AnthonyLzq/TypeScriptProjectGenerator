import { Document, model, Schema } from 'mongoose'

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
