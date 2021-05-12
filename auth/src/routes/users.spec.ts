import { app } from '../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('auth', () => {
  it('fails with username that does not exist', async () => {
    const res = await chai.request(app).post('/api/v1/auth/login').send({
      username: 'username',
      password: 'password'
    })
    expect(res).to.have.status(400)
  })

  it('fails with incorrect account password', async () => {
    const user = await chai.request(app).post('/api/v1/auth/signup').send({
      username: 'username',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const response = await chai.request(app).post('/api/v1/auth/login').send({
      username: 'username',
      password: 'pass123'
    })
    expect(response).to.have.status(400)
  })

  it('fails with username aready exist', async () => {
    const user = await chai.request(app).post('/api/v1/auth/signup').send({
      username: 'username',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const response = await chai.request(app).post('/api/v1/auth/signup').send({
      username: 'username',
      password: 'pass123'
    })
    expect(response).to.have.status(400)
  })
})
