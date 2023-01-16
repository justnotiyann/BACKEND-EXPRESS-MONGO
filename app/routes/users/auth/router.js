const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../../middleware/isAuth");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/session", isAuth, controller.checkSession);

router.post("/logout", controller.destroy);

module.exports = router;
