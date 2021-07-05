const standardModelControllers = require("./standardModelControllers");
const Property = require("../Models/properties");

const controllers = standardModelControllers(Property);

module.exports = controllers;
