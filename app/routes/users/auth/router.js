const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../../middleware/isAuth");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/logout", controller.destroy);

router.get("/session", isAuth, controller.checkSession);

module.exports = router;
