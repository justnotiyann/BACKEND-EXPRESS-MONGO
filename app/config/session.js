var session = require("express-session");
var MongoStore = require("connect-mongo");
const { SECRET_KEY, MONGO_URI } = process.env;

exports.sessionVariabel = session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
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
