const router = require("express").Router();
const controller = require("./controller");

router.get("/users", controller.index);
// router.post("/users", controller.create);
// router.get("/users/:id/edit", controller.show);
// router.put("/users/:id", controller.update);
// router.delete("/users/:id/delete", controller.destroy);

module.exports = router;
