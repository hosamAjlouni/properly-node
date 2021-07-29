const Lease = require("../models/leases");
const router = require("express").Router();
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/leases");
const filterConstructor = require("../middleware/filterConstructor");
const leaseValidator = require("../fieldsValidationMW/leases");

router.post("/", ...leaseValidator, create);
router.get("/", filterConstructor(Lease), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", ...leaseValidator, update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
