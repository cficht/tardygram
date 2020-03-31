const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'user already exists']
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoUrl: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

module.exports = mongoose.model('User', schema);
