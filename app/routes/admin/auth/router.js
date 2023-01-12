const router = require("express").Router();
const controller = require("./controller");
const { body, check } = require("express-validator");

router.post("/register", controller.register);

router.post("/login", controller.login);
module.exports = router;
