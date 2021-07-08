const standardApiSet = require("./standardApiSet");
const User = require("../Models/users");

const viewSet = standardApiSet(User);

module.exports = {
  ...viewSet
};
