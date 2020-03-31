const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate } = {}) => {
  await User.create({
    username: 'Chris',
    password: 'abc123',
    profilePhotoUrl: 'http://https://placekitten.com/200/287'
  });

  // await User.create([...Array(usersToCreate)].slice(1).map(() => ({
  //   username: chance.email(),
  //   password: chance.word(),
  //   profilePhotoUrl: chance.url()
  // })));
};
