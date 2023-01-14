var session = require("express-session");
var MongoStore = require("connect-mongo");

const sessionVariabel = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI_LOCALHOST,
    touchAfter: 24 * 3600,
    collectionName: "user_session",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 0.1,
    sameSite: false,
    secure: false,
  },
  name: "session_id",
});

module.exports = { sessionVariabel };
