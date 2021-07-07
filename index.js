const express = require("express");
const apiRouter = require("./Routers/api.router");
const filterObjectGenerator = require("./Middleware/filterObjectGenerator.middleware")
require("./database/database");
require("./Models");

const port = 8000

const app = express();

app.use(express.json());
app.use(filterObjectGenerator);


app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
