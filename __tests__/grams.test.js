const { getUser, getAgent } = require('../db/data-helpers');

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

});
