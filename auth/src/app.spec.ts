import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { app } from './app'

chai.use(chaiHttp)

describe('API connected', () => {
  it('it sends a welcome message', async () => {
    const res = await chai.request(app).get('/api/v1/auth')
    expect(res).to.have.status(200)
    expect(res.body.status).to.equals('success')
    expect(res.body.message).to.equals('Welcome to auth service')
  })
})
