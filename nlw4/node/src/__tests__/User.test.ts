import request from 'supertest'
import { app } from '../server'
import createConnection from '../database'

describe("Users", () => {
  beforeAll(async() => {
    const connection = await createConnection()
    connection.runMigrations()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'user test',
      email: 'user@test.com'
    })

    expect(response.status).toBe(201)
  })

})