const standardApiSet = require("./standardApiSet");
const Unit = require("../Models/units");

const viewSet = standardApiSet(Unit);

module.exports = {
  ...viewSet
};
