const standardApiSet = require("./standardApiSet");
const WorkSpace = require("../Models/workSpaces");

const viewSet = standardApiSet(WorkSpace);

module.exports = {
  ...viewSet
};
