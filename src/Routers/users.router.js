const router = require("express").Router();
const controllers = require("../Controllers/users.controllers");
const standardRouter = require('./standardRouter')

standardRouter(router, controllers)

module.exports = router;
