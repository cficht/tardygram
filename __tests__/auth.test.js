require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signup user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Chris',
        password: 'abc123',
        profilePhotoUrl: 'http://https://placekitten.com/200/287'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Chris',
          profilePhotoUrl: 'http://https://placekitten.com/200/287',
          __v: 0
        });
      });
  });
});
