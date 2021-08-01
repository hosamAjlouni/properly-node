const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db", "admin", "admin", {
  dialect: "sqlite",
  host: "./database/db.sqlite",
});

sequelize.sync({alter: false}).then(() => {
  console.log("Database is ready!");
});

module.exports = sequelize;
