const User = require("./users");
const Property = require("./properties");
const Unit = require("./units");
const Lease = require("./leases");
const Contact = require("./contacts");
const Workspace = require("./workspaces");

// Workspace
Workspace.hasMany(User, {
  foreignKey: {
    allowNull: false,
  },
});
Workspace.hasMany(Property, {
  foreignKey: {
    allowNull: false,
    unique: "uniqueProperty",
  },
});
Workspace.hasMany(Unit, {
  foreignKey: {
    allowNull: false,
    unique: "uniqueUnit"
  },
});
Workspace.hasMany(Contact, {
  foreignKey: {
    allowNull: false,
  },
});

Workspace.hasMany(Lease, {
  foreignKey: {
    allowNull: false,
  },
});

// User
User.belongsTo(Workspace);

// Property
Property.belongsTo(Workspace);
Property.hasMany(Unit, {
  foreignKey: {
    unique: "uniqueUnit",
    allowNull: false,
  },
});

// Unit
Unit.belongsTo(Workspace);
Unit.belongsTo(Property);
Unit.hasMany(Lease, {
  foreignKey: {
    allowNull: false,
  },
});

// Contact
Contact.belongsTo(Workspace)

// Lease
Lease.belongsTo(Workspace)
Lease.belongsTo(Unit)
