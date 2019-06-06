const express = require('express');
const helmet = require('helmet');

const { registerRouter, loginRouter, userRouter } = require('./routes');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/register', registerRouter);
// server.use('/api/login', loginRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Authentication Challenge!</h2>`)
  });

module.exports = server;