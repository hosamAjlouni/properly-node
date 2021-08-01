const router = require("express").Router();
const { list } = require("../controllers/permissions");

router.get("/", list);


module.exports = router;
