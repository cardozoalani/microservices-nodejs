import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

export const getToken = (): string[] => {
  process.env.JWT_KEY = 'askjlkfjlasfamskjsd'

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    username: 'test'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)

  return [`${token}`]
}
