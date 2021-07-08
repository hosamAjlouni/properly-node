const standardApiSet = require("./standardApiSet");
const Property = require("../Models/properties");

const viewSet = standardApiSet(Property);

module.exports = {
  ...viewSet,
};
