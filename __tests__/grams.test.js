const { getUser, getAgent, getGrams } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('grams routes', () => {

  it('create a new gram', async() => {
    const user = await getUser({ username: 'Chris' });
    return getAgent()
      .post('/api/v1/grams')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'So cool!',
        tags: ['#fun', '#bestlyfe']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'https://www.placecage.com/200/300',
          caption: 'So cool!',
          tags: ['#fun', '#bestlyfe'],
          __v: 0
        });
      });
  });

  it('gets all grams', async() => {
    const grams = await getGrams();
    return request(app)
      .get('/api/v1/grams')
      .then(res => {
        expect(res.body).toEqual(grams);
      });
  });

});
