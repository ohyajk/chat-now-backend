const session = require('express-session');

const sessionMiddleware = session({
    name: 'sid',
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
});

module.exports = sessionMiddleware;