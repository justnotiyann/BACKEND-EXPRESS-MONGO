const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.index);
router.post("/", controller.store);
router.get("/:id/detail", controller.show);
router.put("/update/:id", controller.update);
router.delete("/delete/:id", controller.destroy);

module.exports = router;
