const router = require("express").Router();
const controller = require("./controller");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/session", controller.checkSession);

router.post("/logout", controller.destroy);

module.exports = router;
