import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { BadRequestError } from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const publicKey = fs.readFileSync(
  path.join(__dirname, '../../key/secret-volume/auth0-key-public.pem')
)

declare global {
  namespace Express {
    interface Request {
      session?: mongoose.Types.ObjectId
    }
  }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new BadRequestError('Unauthorized')
  }
  try {
    const payload: any = jwt.verify(authHeader, publicKey, { algorithms: ['RS256'] })
    if (!payload) {
      throw new BadRequestError('Unauthorized')
    }
    req.session = payload?.id
    next()
  } catch (error) {
    throw new BadRequestError('Unauthorized')
  }
}
