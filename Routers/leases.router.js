const router = require("express").Router();
const controllers = require("../Controllers/leases.controllers");
const standardRouter = require('./standardRouter')

standardRouter(router, controllers)

module.exports = router;
