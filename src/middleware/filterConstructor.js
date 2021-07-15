const { Op } = require("sequelize");
const { BadRequestError } = require("./error-handler");

const filterConstructor = (Model) => {
  const allowedAttr = Model.rawAttributes;
  return (req, res, next) => {
    const query = req.query;
    const filter = {};

    if (!Object.keys(query).length) return next();

    // construct a general filter
    Object.keys(query).forEach((key) => {
      if (key.includes("_")) {
        const [col, operator] = key.split("_");
        if (!(operator in Op)) {
          throw new BadRequestError(`${operator} is not a valid operator.`);
        }
        filter[col] = { [Op[operator]]: query[key] };
      } else {
        filter[key] = query[key];
      }
    });

    // ensure that filter attributes matches model's attributes
    const disAllowedAttr = Object.keys(filter).filter(
      (key) => !(key in allowedAttr)
    );

    if (disAllowedAttr.length) {
      throw new BadRequestError(
        `${disAllowedAttr.join(", ")} are not valid filter attributes.`
      );
    }

    req.filter = filter;
    return next();
  };
};

module.exports = filterConstructor;
