require('express-async-errors')
require("./database/database");
require("./Models");
const express = require("express");
const { errorHandler } = require("./Middleware/error-handler");
const apiRouter = require("./Routers/api.router");

const port = 8000;

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
