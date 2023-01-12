const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

mongoose.connect(process.env.MONGO_URI_LOCALHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("open", () => console.log("connected to database"));
db.once("error", () => console.log("failed to connected database"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      // mongoUrl: process.env.MONGO_URI_LOCALHOST_LOCALHOST,
      mongoUrl: process.env.MONGO_URI_LOCALHOST,
      touchAfter: 24 * 3600, // time period in seconds
      collectionName: "user_session",
    }),
  })
);

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT || 3000, () =>
  console.log("server up and running")
);

// auth routes
const authRoutes = require("./app/routes/users/auth/router");

// users routes
const dashboardRoutes = require("./app/routes/admin/dashboard_users/router");
const orderRoutes = require("./app/routes/users/order/router");

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/order", orderRoutes);

// error
const notFound = require("./app/middleware/not-found");
const handleError = require("./app/middleware/ErrorHandlingMiddleware");
app.use(notFound);
app.use(handleError);

module.exports = app;
