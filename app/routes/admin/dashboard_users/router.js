const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../../middleware/isAuth");

router.get("/", isAuth, controller.index);
router.get("/:id/detail", isAuth, controller.show);
router.put("/update/:id", isAuth, controller.update);
router.delete("/delete/:id", isAuth, controller.destroy);
router.get("/order", isAuth, controller.getAllOrders);

module.exports = router;
