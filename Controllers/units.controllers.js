const standardModelControllers = require("./standardModelControllers");
const Unit = require("../Models/units");

const controllers = standardModelControllers(Unit);

module.exports = controllers;
