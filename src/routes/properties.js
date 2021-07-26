const router = require("express").Router();
const filterConstructor = require("../middleware/filterConstructor");
const Property = require("../models/properties");
const { createPropertyValidator } = require("../validatorsMW/properties");

const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/properties");

router.post("/", ...createPropertyValidator, create);
router.get("/", filterConstructor(Property), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
