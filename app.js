const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const { connect } = require("./app/config/connection");
const { sessionVariabel } = require("./app/config/session");

connect();
app.use(sessionVariabel);

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const api = "/api";

const authRoutes = require("./app/routes/users/auth/router");
const dashboardRoutes = require("./app/routes/admin/dashboard_users/router");
const orderRoutes = require("./app/routes/users/order/router");
const booksRoutes = require("./app/routes/admin/dashboard_books/router");

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/order`, orderRoutes);
app.use(`${api}/dashboard/users`, dashboardRoutes);
app.use(`${api}/dashboard/books`, booksRoutes);

// error
const notFound = require("./app/middleware/not-found");
const handleError = require("./app/middleware/ErrorHandlingMiddleware");
app.use(notFound);
app.use(handleError);

app.listen(process.env.PORT || 3000, () =>
  console.log("server up and running")
);
module.exports = app;
