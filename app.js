const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

mongoose.connect(process.env.MONGO_URI_LOCALHOST, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("open", () => console.log("connected to database"));
db.once("error", () => console.log("failed to connected database"));

app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI_LOCALHOST,
      touchAfter: 24 * 3600, // time period in seconds
      collectionName: "user_session",
    }),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 3000, () =>
  console.log("server up and running")
);

// routes
const indexRoutes = require("./app/routes/users/router");

app.use("/", indexRoutes);

// error
const notFound = require("./app/middleware/not-found");
const handleError = require("./app/middleware/ErrorHandlingMiddleware");
app.use(notFound);
app.use(handleError);

module.exports = app;
