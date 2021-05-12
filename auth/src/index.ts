import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  if (!process.env.MONGO_USERNAME) {
    throw new Error('MONGO_USERNAME must be defined')
  }
  if (!process.env.MONGO_PASSWORD) {
    throw new Error('MONGO_PASSWORD must be defined')
  }
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@users.f1vts.mongodb.net/users?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
    console.log('Connected to mongoDB!')
  } catch (err) {
    console.error(err)
  }
  app.set('port', process.env.PORT || 3000)
  app.listen(app.get('port'), () => {
    console.log(`Listering on port ${app.get('port')}`)
  })
}

start()
