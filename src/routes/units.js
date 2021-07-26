const filterConstructor = require("../middleware/filterConstructor");
const router = require("express").Router();
const Unit = require("../models/units");
const { unitValidator } = require('../validatorsMW/units')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/units");

router.post("/", ...unitValidator, create);
router.get("/", filterConstructor(Unit), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", ...unitValidator, update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
