require("./models/database");
require("./models");
require("express-async-errors");

const { errorHandler } = require("./middleware/error-handler");
const apiRouter = require("./routes/api");
const config = require("config");
const express = require("express");

if (!config.get("jwtPrivateKey")) {
  throw new Error("FATAL Error: jwtPrivateKey is not defined");
}
const port = 8000;

const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
