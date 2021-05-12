import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import sinon from 'sinon'
import fs from 'fs'
import path from 'path'
mongoose.set('useCreateIndex', true)

let mongo: any
before(async () => {
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  process.env.JWT_KEY = 'ASDF'

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

after(async (done) => {
  sinon.restore()
  mongo.stop()
  mongoose.connection.close()
  done()
})
