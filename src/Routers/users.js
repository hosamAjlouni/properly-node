const User = require("../Models/users");
const router = require("express").Router();
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../Controllers/users");
const filterConstructor = require("../Middleware/filterConstructor");

router.post("/", create);
router.get("/", filterConstructor(User), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
