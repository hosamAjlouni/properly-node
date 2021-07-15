const router = require("express").Router();
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/properties");
const filterConstructor = require("../middleware/filterConstructor");
const Property = require("../models/properties");
const propertyValidators = require("../validatorsMW/properties");

router.post("/", ...propertyValidators, create);
router.get("/", filterConstructor(Property), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
