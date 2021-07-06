const { Op } = require("sequelize");
const filterObjectGenerator = (req, res, next) => {
  const query = req.query;
  const filter = {};

  Object.keys(query).forEach((key) => {
    if (!key.includes("_")) {
      filter[key] = query[key];
    } else {
      const [col, operator] = key.split("_");
      console.log(query.key)
      filter[col] = { [Op[operator]]: query[key] };
    }
  });

  req.filter = filter;
  next();
};

module.exports = filterObjectGenerator;
