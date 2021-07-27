const { Op } = require("sequelize");
const { BadRequestError } = require("./error-handler");

const filterConstructor = (Model) => {
  const allowedAttr = Model.rawAttributes;
  
  return (req, res, next) => {
    const queryString = req.query;
    const filter = {};

    if (!Object.keys(queryString).length) return next();

    // construct a general filter
    Object.keys(queryString).forEach((key) => {
      if (key.includes("_")) {
        const [col, operator] = key.split("_");
        if (!(operator in Op)) {
          throw new BadRequestError(`${operator} is not a valid operator.`);
        }
        filter[col] = { [Op[operator]]: queryString[key] };
      } else {
        filter[key] = queryString[key];
      }
    });

    // ensure that filter attributes matches model's attributes
    const disallowedAttr = Object.keys(filter).filter(
      (key) => !(key in allowedAttr)
    );

    if (disallowedAttr.length) {
      throw new BadRequestError(
        `${disallowedAttr.join(", ")} are not valid filter attributes.`
      );
    }

    req.filter = filter;
    return next();
  };
};

module.exports = filterConstructor;
