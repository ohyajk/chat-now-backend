const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionMiddleware = session({
    name: 'sid',
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    store: new MongoDBStore({
        uri: process.env.DB_URL,
        collection: 'sessions'
    })
});

module.exports = sessionMiddleware;