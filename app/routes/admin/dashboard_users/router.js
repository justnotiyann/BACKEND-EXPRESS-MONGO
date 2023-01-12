const router = require("express").Router();
const controller = require("./controller");

router.get("/users", controller.index);
router.delete("/users/delete/:id", controller.destroy);
router.put("/users/update/:id", controller.update);

// tampilkan 1 user

router.get("/users/:id/detail", controller.show);

module.exports = router;