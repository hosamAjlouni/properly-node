const router = require("express").Router();
const { list, update } = require("../controllers/user_permissions");

router.get("/:userId([0-9]+)/", list);
router.put("/:userId([0-9]+)/", update);

module.exports = router;
