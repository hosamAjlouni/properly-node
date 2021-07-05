const standardModelControllers = require("./standardModelControllers");
const User = require("../Models/users");

const controllers = standardModelControllers(User);

module.exports = controllers;
