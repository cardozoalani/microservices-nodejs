import { app } from '../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getToken } from '../test/token'
import path from 'path'
const AWSMock = require('aws-sdk-mock')
import AWS = require('aws-sdk')
AWSMock.setSDKInstance(AWS)
chai.use(chaiHttp)

describe('/file', () => {
  it('responds success to upload file', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/file')
      .set({ Authorization: `${token}` })
      .field('Content-Type', 'multipart/form-data; files=' + Math.random())
      .field('name', 'test.jpg')
      .field('description', 'Nature+Pics')
      .field('caption', 'nature')
      .field('contacts', '["' + 911354971564 + '","' + 919092888819 + '"]')
      .field('dimensions', '{"files":{"height": 10, "width": 10}}')
      .attach('files', path.join(__dirname, '../test/img/test.jpg'))

    expect(res).to.have.status(201)
  })
  it('responds not authenticated to upload file', async () => {
    const token = 'fail'
    const res = await chai
      .request(app)
      .post('/api/v1/files/file')
      .set({ Authorization: `${token}` })
      .field('Content-Type', 'multipart/form-data; files=' + Math.random())
      .field('originalname', 'test.jpg')
      .field('description', 'Nature+Pics')
      .field('caption', 'nature')
      .field('contacts', '["' + 911354971564 + '","' + 919092888819 + '"]')
      .field('dimensions', '{"files":{"height": 10, "width": 10}}')
      .attach('files', path.join(__dirname, '../test/img/test.jpg'))

    expect(res).to.have.status(401)
  })

  it('responds success to get file', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/file')
      .set({ Authorization: `${token}` })
      .field('Content-Type', 'multipart/form-data; files=' + Math.random())
      .field('name', 'test.jpg')
      .field('description', 'Nature+Pics')
      .field('caption', 'nature')
      .field('contacts', '["' + 911354971564 + '","' + 919092888819 + '"]')
      .field('dimensions', '{"files":{"height": 10, "width": 10}}')
      .attach('files', path.join(__dirname, '../test/img/test.jpg'))

    expect(res).to.have.status(201)
    const data = await chai
      .request(app)
      .get(`/api/v1/files/file?fileName=test.jpg`)
      .set({ Authorization: `${token}` })

    expect(data).to.have.status(200)
  })

  it('responds faild find file', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/file')
      .set({ Authorization: `${token}` })
      .field('Content-Type', 'multipart/form-data; files=' + Math.random())
      .field('name', 'test.jpg')
      .field('description', 'Nature+Pics')
      .field('caption', 'nature')
      .field('contacts', '["' + 911354971564 + '","' + 919092888819 + '"]')
      .field('dimensions', '{"files":{"height": 10, "width": 10}}')
      .attach('files', path.join(__dirname, '../test/img/test.jpg'))

    expect(res).to.have.status(201)
    const data = await chai
      .request(app)
      .get(`/api/v1/files/file?fileName=tet.jpg`)
      .set({ Authorization: `${token}` })

    expect(data).to.have.status(401)
  })

  it('responds success to download file', async () => {
    const token = getToken()
    const res = await chai
      .request(app)
      .post('/api/v1/files/file')
      .set({ Authorization: `${token}` })
      .field('Content-Type', 'multipart/form-data; files=' + Math.random())
      .field('name', 'test.jpg')
      .field('description', 'Nature+Pics')
      .field('caption', 'nature')
      .field('contacts', '["' + 911354971564 + '","' + 919092888819 + '"]')
      .field('dimensions', '{"files":{"height": 10, "width": 10}}')
      .attach('files', path.join(__dirname, '../test/img/test.jpg'))

    expect(res).to.have.status(201)
    const data = await chai
      .request(app)
      .get(`/api/v1/files/file?fileName=test.jpg`)
      .set({ Authorization: `${token}` })
    expect(data).to.have.status(200)
    expect(data.redirects).to.have.lengthOf(1)
    expect(data.redirects[0]).to.eql(res.body.url)
  })
})
