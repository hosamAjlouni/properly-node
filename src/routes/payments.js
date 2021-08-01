const filterConstructor = require("../middleware/filterConstructor");
const router = require("express").Router();
const Payment = require("../models/payments");
const paymentValidator = require('../fieldsValidationMW/payments')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/payments");

router.post("/", ...paymentValidator, create);
router.get("/", filterConstructor(Payment), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", ...paymentValidator, update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
