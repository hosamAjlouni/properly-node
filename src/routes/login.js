const router = require("express").Router();
const login = require("../controllers/login");
const { body } = require("express-validator");

router.post(
  "/",
  body("email").exists().isEmail().withMessage("Should be an Email."),
  body("password").exists().isString(),
  login
);

module.exports = router;
