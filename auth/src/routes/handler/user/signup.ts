import { Request, Response } from 'express'
import { User } from '../../../models/user'
import { BadRequestError } from '../../../common'

export default async (req: Request, res: Response) => {
  const { username, password } = req.body
  const existUser = await User.findOne({ username: username })

  if (existUser) {
    throw new BadRequestError('Username already in use')
  }

  const user = new User({
    username: username,
    password: password
  })
  await user.save()
  req.session = null
  res.status(201).send(user)
}
