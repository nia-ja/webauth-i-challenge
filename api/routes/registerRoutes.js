const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const { addUser }  = require('../helpers/userHelper.js');

// route: /api/register
// returns a new user object (if the new user is created) or error
router.post('/', (req, res) => {
    let user = req.body;
  
    if(!user.username || !user.password) {
      return res.status(500).json({message: "Need username and password"});
    }
  
    if (user.password.length < 8) {
      return res.status(400).json({ message: 'Password is too short!'});
    }

    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    addUser(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

module.exports = router;