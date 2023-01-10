const router = require("express").Router();
const controller = require("./controller");
const { body, check } = require("express-validator");

router.get("/api/users", controller.getAllUsers);

router.post(
  "/auth/register",
  body("email").isEmail(),
  body("username").not().isEmpty(),
  check("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  controller.register
);

router.post("/auth/login", controller.login);
module.exports = router;
