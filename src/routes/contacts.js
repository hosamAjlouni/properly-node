const filterConstructor = require("../middleware/filterConstructor");
const router = require("express").Router();
const Contact = require("../models/contacts");
const contactValidator = require('../fieldsValidationMW/contacts')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/contacts");

router.post("/", ...contactValidator, create);
router.get("/", filterConstructor(Contact), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", ...contactValidator, update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
