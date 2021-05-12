import { app } from '../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getToken } from '../test/token'

chai.use(chaiHttp)

describe('/data', () => {
  const customer = {
    name: 'Pedro',
    segment1: true,
    segment2: false,
    segment3: false,
    segment4: true,
    platformId: 1580,
    clientId: 1
  }
  it('responds not authenticated to get data', async () => {
    const res = await chai.request(app).get('/api/v1/files/data').send({})
    expect(res).to.have.status(401)
  })
  it('responds not authenticated to create data', async () => {
    const res = await chai.request(app).post('/api/v1/files/data').send(customer)
    expect(res).to.have.status(401)
  })
  it('Created a new customer success', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/data')
      .set({ Authorization: `${token}` })
      .send(customer)
    expect(res).to.have.status(201)
    expect(res.body).to.have.ownProperty('name')
    expect(res.body).to.have.ownProperty('segment1')
    expect(res.body).to.have.ownProperty('segment2')
    expect(res.body).to.have.ownProperty('segment3')
    expect(res.body).to.have.ownProperty('segment4')
    expect(res.body).to.have.ownProperty('platformId')
    expect(res.body).to.have.ownProperty('clientId')
  })
  it('Fail to not send all request params', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/data')
      .set({ Authorization: `${token}` })
      .send({
        name: 'pedro'
      })

    expect(res).to.have.status(400)
    expect(res.body.errors).to.have.lengthOf(12)
    expect(res.body).to.haveOwnProperty('errors')
    expect(res.body.errors[1].field).to.eql('segment1')
    expect(res.body.errors[3].field).to.eql('segment2')
    expect(res.body.errors[5].field).to.eql('segment3')
    expect(res.body.errors[7].field).to.eql('segment4')
    expect(res.body.errors[9].field).to.eql('platformId')
    expect(res.body.errors[11].field).to.eql('clientId')
  })
})
