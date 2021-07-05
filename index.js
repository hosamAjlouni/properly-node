const express = require("express");
const apiRouter = require("./Routers/api.router");
require("./database/database");
require("./Models");

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

app.listen(8000, () => {
  console.log("Listening on port 8000...");
});
