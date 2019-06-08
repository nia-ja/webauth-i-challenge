const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { getUsers }  = require('../helpers/userHelper.js');
const restricted = require('../auth/restricted-middleware.js');

// route: /api/users
router.get('/', restricted, (req, res) => {
    getUsers()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
});

module.exports = router;