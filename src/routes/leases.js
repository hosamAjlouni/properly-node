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

router.post("/", create);
router.get("/", filterConstructor(Lease), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
