const { getUser, getAgent, getGram, getComment } = require('../db/data-helpers');

describe('comments routes', () => {

  it('creates a comment', async() => {
    const user = await getUser({ username: 'Chris' });
    const gram = await getGram({ user: user._id });
    return getAgent()
      .post('/api/v1/comments')
      .send({ comment: 'Wow! Awesome', post: gram._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          post: gram._id,
          comment: 'Wow! Awesome',
          __v: 0
        });
      });
  });

  it('deletes a comment', async() => {
    const user = await getUser({ username: 'Chris' });
    const comment = await getComment({ commentBy: user._id });
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });

});
