const router = require("express").Router();
const controllers = require("../Controllers/properties.controllers");
const standardRouter = require('./standardRouter')

standardRouter(router, controllers)

module.exports = router;
