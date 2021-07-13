const router = require("express").Router();
const routers = require("./index.router");

router.use("/users", routers.usersRouter);
router.use("/workSpaces", routers.workSpacesRouter);
router.use("/properties", routers.propertiesRouter);
router.use("/units", routers.unitsRouter);
router.use("/leases", routers.leasesRouter);
router.use("/contacts", routers.contactsRouter);

module.exports = router;
