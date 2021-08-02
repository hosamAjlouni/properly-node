const Workspace = require("./workspaces");
const User = require("./users");
const Property = require("./properties");
const Unit = require("./units");
const Lease = require("./leases");
const Contact = require("./contacts");
const Invoice = require("./invoices");
const Payment = require("./payments");
const Permission = require("./permissions");

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
    unique: "uniqueUnit",
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
Workspace.hasMany(Invoice, {
  foreignKey: {
    allowNull: false,
  },
});
Workspace.hasMany(Payment, {
  foreignKey: {
    allowNull: false,
  },
});

// User
User.belongsTo(Workspace);
User.belongsToMany(Permission, { through: "user_permissions" });

// Property
Property.belongsTo(Workspace);
Property.hasMany(Unit, {
  foreignKey: {
    unique: "uniqueUnit",
    allowNull: false,
  },
});
Property.hasMany(Invoice, {
  foreignKey: {
    allowNull: false,
  },
});
Property.hasMany(Payment, {
  foreignKey: {
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
Unit.hasMany(Invoice, {
  foreignKey: {
    allowNull: false,
  },
});
Unit.hasMany(Payment, {
  foreignKey: {
    allowNull: false,
  },
});

// Contact
Contact.belongsTo(Workspace);
Contact.hasMany(Invoice, {
  foreignKey: {
    allowNull: false,
  },
});

// Lease
Lease.hasMany(Invoice, {
  foreignKey: {
    allowNull: false,
  },
});
Lease.hasMany(Payment, {
  foreignKey: {
    allowNull: false,
  },
});
Lease.belongsTo(Workspace);
Lease.belongsTo(Unit);

// Invoice
Invoice.belongsTo(Lease);
Invoice.belongsTo(Workspace);
Invoice.belongsTo(Property);
Invoice.belongsTo(Unit);
Invoice.belongsTo(Contact);
Invoice.hasMany(Payment, {
  foreignKey: {
    allowNull: false,
  },
});

// Payment
Payment.belongsTo(Workspace);
Payment.belongsTo(Property);
Payment.belongsTo(Unit);
Payment.belongsTo(Lease);
Payment.belongsTo(Invoice);

// Permissions
Permission.belongsToMany(User, {
  through: "user_permissions",
  joinTableAttributes: [],
});
