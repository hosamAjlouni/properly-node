const Contact = require("../Models/contacts");
const router = require("express").Router();
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../Controllers/contacts");
const filterConstructor = require("../Middleware/filterConstructor");

router.post("/", create);
router.get("/", filterConstructor(Contact), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
