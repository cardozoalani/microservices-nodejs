import mongoose from 'mongoose'
import { Password } from '../services/encryptPassword'

interface UserAttrs {
  username: string
  password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document {
  username: string
  password: string
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (atts: UserAttrs) => {
  return new User(atts)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
