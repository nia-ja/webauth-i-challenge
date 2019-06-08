const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const SessionStore = require('connect-session-knex')(session);

const { registerRouter, loginRouter, userRouter } = require('./routes');

const server = express();
// session/cookie config
const sessionConfig = {
    name: 'monkey',
    secret: 'super secret string',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // in ms === 1h
      secure: false, // you want it true in production
      httpOnly: true
    },
    store: new SessionStore({
      knex: require('../data/dbConfig.js'), // knex instance to use. Defaults to a new knex instance, using sqlite3 with a file named 'connect-session-knex.sqlite'
      tablename: 'sessions', // Tablename to use. Defaults to 'sessions'.
      sidfieldname: 'sid', // Field name in table to use for storing session ids. Defaults to 'sid'.
      createTable: true, //  if the table for sessions should be created automatically or not
      clearInterval: 60 * 60 * 1000, // === 1h in ms. Defaults to 60000.
    })
}

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Authentication Challenge!</h2>`)
  });

module.exports = server;