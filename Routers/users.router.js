const router = require("express").Router();
const controllers = require("../Controllers/users.controllers");

router.get("/", controllers.list);
router.get("/:id", controllers.detail);
router.get("/:id/with_:association", controllers.detailAssociation);
router.post("/", controllers.create);
router.put("/:id", controllers.update);
router.delete("/:id", controllers.remove);

module.exports = router;
