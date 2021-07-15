const Workspace = require("../models/workspaces");
const router = require("express").Router();
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controllers/properties");
const filterConstructor = require("../middleware/filterConstructor");

router.post("/", create);
router.get("/", filterConstructor(Workspace), list);
router.get("/:id([0-9]+)/", detail);
router.put("/:id([0-9]+)/", update);
router.delete("/:id([0-9]+)/", remove);

module.exports = router;
