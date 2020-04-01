const { getUser, getUsers, getAgent, getGrams, getGram, getComments } = require('../db/data-helpers');

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

  it('gets a gram by id', async() => {
    const user = await getUser({ username: 'Chris' });
    const gram = await getGram({ user: user._id });
    const comments = await getComments({ post: gram._id });
    const commenters = await getUsers();
    comments.forEach(comment => {
      commenters.forEach(commenter => {
        if(comment.commentBy === commenter._id) comment.commentBy = commenter;
      });
    });
    return getAgent()
      .get(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual({ ...gram, user: user, comments });
      });
  });

  it('updates a grams caption', async() => {
    const user = await getUser({ username: 'Chris' });
    const gram = await getGram({ user: user._id });
    return getAgent()
      .patch(`/api/v1/grams/${gram._id}`)
      .send({ caption: 'Words are changing' })
      .then(res => {
        expect(res.body).toEqual({ ...gram, caption: 'Words are changing' });
      });
  });

  it('deletes a gram', async() => {
    const user = await getUser({ username: 'Chris' });
    const gram = await getGram({ user: user._id });
    return getAgent()
      .delete(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual(gram);
      });
  });

});
