const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Gram = require('../lib/models/Gram');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 5, gramsToCreate = 50, commentsToCreate = 200 } = {}) => {
  const loggedIn = await User.create({
    username: 'Chris',
    password: 'abc123',
    profilePhotoUrl: 'http://https://placekitten.com/200/287'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.word(),
    profilePhotoUrl: chance.url()
  })));

  const grams = await Gram.create([...Array(gramsToCreate)].map(() => ({
    user: chance.weighted([loggedIn, ...users], [2, ...users.map(() => 1)])._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [...Array(10)].map(() => (chance.hashtag()))
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    commentBy: chance.pickone(users),
    post: chance.pickone(grams),
    comment: chance.sentence()
  })));
};
