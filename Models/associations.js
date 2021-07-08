const User = require("./users");
const Property = require("./properties");
const Unit = require("./units");
const Contact = require("./contacts");
const Workspace = require("./workspaces");

// Workspace
Workspace.hasMany(User);
Workspace.hasMany(Property);
Workspace.hasMany(Unit);
Workspace.hasMany(Contact);

// User
User.belongsTo(Workspace);

// Property
Property.hasMany(Unit, {
  foreignKey: {
    name: 'propertyId',
    unique: "propertyUnit",
    allowNull: false
  }
});
Property.belongsTo(Workspace);

// Unit
Unit.belongsTo(Property);
Unit.belongsTo(Workspace);

// Contact
Contact.belongsTo(Workspace);
