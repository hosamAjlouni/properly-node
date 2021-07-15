require("express-async-errors");
require("./database/database");
require("./models");
const express = require("express");
const { errorHandler } = require("./middleware/error-handler");
const apiRouter = require("./routes/api.router");
const config = require("config");
const authenticate = require("./middleware/authenticate");

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL Error: jwtPrivateKey is not defined");
}
const port = 8000;

const app = express();

app.use(express.json());
app.use(authenticate)
app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
