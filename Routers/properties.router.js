const router = require("express").Router();
const controllers = require("../Controllers/properties.controllers");

router.get("/", controllers.list);
router.get("/:id", controllers.detail);
router.get("/:id/:association", controllers.association);
router.post("/", controllers.create);
router.put("/:id", controllers.update);
router.delete("/:id", controllers.remove);

module.exports = router;
