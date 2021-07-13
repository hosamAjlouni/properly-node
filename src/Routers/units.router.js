const router = require("express").Router();
const controllers = require("../Controllers/units.controllers");
const standardRouter = require('./standardRouter')

standardRouter(router, controllers)

module.exports = router;
