const { Router } = require('express');
const Gram = require('../models/Gram');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .create({ ...req.body, user: req.user._id })
      .then(gram => res.send(gram))
      .catch(next);
  });

