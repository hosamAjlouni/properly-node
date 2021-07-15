const User = require("../models/users");
const router = require("express").Router();
const {
  create,
  authenticate,
  list,
  detail,
  update,
  remove,
} = require("../controllers/users");
const { body } = require("express-validator");
const filterConstructor = require("../middleware/filterConstructor");

router.post("/", create);

router.post(
  "/auth",
  body("email").exists().isEmail().withMessage("Should be an Email."),
  body("password").exists().isString(),
  authenticate
);

router.get("/", filterConstructor(User), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
