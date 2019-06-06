const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { getUsers, addUser }  = require('../helpers/userHelper.js');

// route: /api/users
router.get('/', (req, res) => {
    getUsers()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
});

module.exports = router;