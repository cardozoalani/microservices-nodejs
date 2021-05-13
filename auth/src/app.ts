import express, { Request, Response } from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { json } from 'body-parser'
import routes from './routes'
import { NotFoundError, errorHandler } from './common'
const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})

app.use(cors())
app.use(helmet())
app.use(json())
app.use(morgan('dev'))
app.use(
  cookieSession({
    signed: false,
    httpOnly: true,
    secure: false,
    name: 'session:auth'
  })
)
app.use(
  morgan('combined', {
    stream: accessLogStream
  })
)
app.use('/api/v1/auth', routes.usersRoutes)
app.get('/api/v1/auth', async (req: Request, res: Response) => {
  res.json({ status: 'success', message: 'Welcome to auth service!' })
})
app.use(errorHandler)
app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError()
})
export { app }
