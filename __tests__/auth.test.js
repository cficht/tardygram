const { getUser, getAgent } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {

  it('signup user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Bob',
        password: 'admin',
        profilePhotoUrl: 'http://https://placekitten.com/200/287'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Bob',
          profilePhotoUrl: 'http://https://placekitten.com/200/287',
          __v: 0
        });
      });
  });

  it('login user', async() => {
    const user = await getUser({ username: 'Chris' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: user.username,
        password: 'abc123'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: user.username,
          profilePhotoUrl: user.profilePhotoUrl,
          __v: 0
        });
      });
  });

  it('verifies a user', async() => {
    return getAgent()
      .get('/api/v1/auth/verify')
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
