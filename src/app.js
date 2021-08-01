require("./models/database");
require("./models");
require("express-async-errors");

const sequelize = require("./models/database");

const { errorHandler } = require("./middleware/error-handler");
const apiRouter = require("./routes/api");
const config = require("config");
const express = require("express");
const Permission = require("./models/permissions");
const { User } = require("./models");

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL Error: jwtPrivateKey is not defined");
}
const port = 8000;

const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

// app.get("/permissions", async (req, res) => {
//   const permissions = await Permission.findAll();
//   res.send(permissions);
// });

// app.post("/user_permissions/:userId/:permissionId", async (req, res) => {
//   const user = await User.findByPk(req.params.userId);
//   await user.setPermissions([3,4,5])
  
//   res.send(
//     await user.getPermissions({
//       joinTableAttributes: [],
//     })
//   );
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
