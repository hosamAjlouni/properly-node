const standardControllerSet = require("./standardControllerSet");
const Property = require("../Models/properties");

const viewSet = standardControllerSet(Property);

module.exports = {
  ...viewSet,
};
