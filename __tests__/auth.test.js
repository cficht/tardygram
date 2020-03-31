require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {

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

  it('login user', async() => {
    await User.create({
      username: 'Chris',
      password: 'abc123',
      profilePhotoUrl: 'http://https://placekitten.com/200/287'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'Chris',
        password: 'abc123'
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
