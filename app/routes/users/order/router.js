const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../../middleware/isAuth");

router.post("/", isAuth, controller.makeOrder);
router.get("/", isAuth, controller.getAllOrders);

module.exports = router;
