const router = require("express").Router();
const controller = require("./controller");

router.get("/users", controller.getAllUsers);

module.exports = router;
