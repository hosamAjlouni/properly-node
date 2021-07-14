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

// User
User.belongsTo(Workspace);

// Property
Property.belongsTo(Workspace);
Property.hasMany(Unit, {
  // onDelete: "restrict",
  // onUpdate: "CASCADE",
  foreignKey: {
    unique: "uniqueUnit",
    allowNull: false,
  },
});

// Unit
Unit.belongsTo(Property);
Unit.belongsTo(Workspace);
Unit.hasMany(Lease, {
  foreignKey: {
    allowNull: false,
  },
});

// Contact
Contact.belongsTo(Workspace);

// Lease
Lease.belongsTo(Unit)
