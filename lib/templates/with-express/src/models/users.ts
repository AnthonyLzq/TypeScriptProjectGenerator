import { Document, model, Schema } from 'mongoose'

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
