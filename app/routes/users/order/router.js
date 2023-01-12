const router = require("express").Router();
const controller = require("./controller");

router.post("/", controller.store);

module.exports = router;
