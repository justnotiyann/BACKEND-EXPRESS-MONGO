const router = require("express").Router();
const controller = require("./controller");

router.get("/api/users", controller.getAllUsers);

router.post("/auth/register", controller.register);

module.exports = router;
