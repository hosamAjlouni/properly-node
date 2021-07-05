const standardModelControllers = require("./standardModelControllers");
const Contact = require("../Models/contacts");

const controllers = standardModelControllers(Contact);

module.exports = controllers;
