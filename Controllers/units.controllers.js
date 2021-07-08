const standardControllerSet = require("./standardControllerSet");
const Unit = require("../Models/units");

const viewSet = standardControllerSet(Unit);

module.exports = {
  ...viewSet
};
