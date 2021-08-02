const router = require("express").Router();
const userPermissionsValidators = require("../fieldsValidationMW/user_permissions");
const { list, update } = require("../controllers/user_permissions");

router.get("/:userId([0-9]+)/", list);
router.put("/:userId([0-9]+)/", ...userPermissionsValidators, update);

module.exports = router;
