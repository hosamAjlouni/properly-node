const { Op } = require("sequelize");
const filterObjectGenerator = (req, res, next) => {
  const query = req.query;
  const filter = {};

  Object.keys(query).forEach((key) => {
    if (key.includes("_")) {
      const [col, operator] = key.split("_");
      if (query[key].split(",").length > 1)
      filter[col] = { [Op[operator]]: query[key] };
    } else {
      filter[key] = query[key];
    }
  });

  req.filter = filter;
  next();
};

module.exports = filterObjectGenerator;
