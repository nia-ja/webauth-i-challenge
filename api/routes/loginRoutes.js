const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { getUserBy }  = require('../helpers/userHelper.js');

// POST for /api/login

router.post('/', (req, res) => {
    let { username, password } = req.body;
  
    getUserBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // request session information
          req.session.user = user;
          
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
    });
});

module.exports = router;