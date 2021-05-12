import { Request, Response } from 'express'
import { User } from '../../../models/user'
import jwt from 'jsonwebtoken'
import { Password } from '../../../services/encryptPassword'
import { BadRequestError } from '../../../common'
import fs from 'fs'
import path from 'path'

const privateKey = fs.readFileSync(path.join(__dirname, '../../../key/secret-volume/auth0-key.pem'))

export default async (req: Request, res: Response) => {
  const { username, password } = req.body
  const existUser = await User.findOne({ username: username })

  if (!existUser) {
    throw new BadRequestError('Invalid username or password')
  }

  const passwordMatch = await Password.compare(existUser.password, password)

  if (!passwordMatch) {
    throw new BadRequestError('Invalid username or password')
  }

  const userJwt = jwt.sign(
    {
      id: existUser._id,
      username: existUser.username
    },
    privateKey,
    { algorithm: 'RS256' }
  )

  req.session = {
    jwt: userJwt
  }

  res.status(200).send({ token: userJwt })
}
