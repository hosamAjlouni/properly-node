const filterConstructor = require("../middleware/filterConstructor");
const router = require("express").Router();
const Invoice = require("../models/invoices");
const invoiceValidator = require('../fieldsValidationMW/invoices')
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/invoices");

router.post("/", ...invoiceValidator, create);
router.get("/", filterConstructor(Invoice), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", ...invoiceValidator, update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
