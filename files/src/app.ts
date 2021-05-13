import express, { Request, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { json } from 'body-parser'
import routes from './routes'
import { errorHandler, NotFoundError } from './common'
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json')
const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
})

app.use(cors())
app.use(helmet())
app.use(json())
app.use(morgan('dev'))

app.use(
  morgan('combined', {
    stream: accessLogStream
  })
)
app.use('/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1/files', routes.showCustomers)
app.use('/api/v1/files', routes.uploadRouter)
app.get('/api/v1/files', async (req: Request, res: Response) => {
  res.json({ status: 'success', message: 'Welcome to files service!' })
})
app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandler)
export { app }
