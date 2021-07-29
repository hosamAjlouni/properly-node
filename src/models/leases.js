const sequelize = require("./database");
const { Model, DataTypes, Op } = require("sequelize");

class Lease extends Model {}

Lease.init(
  {
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.end < new Date()) return "past";
        else if (this.start > new Date()) return "future";
        else return "active";
      },
    },
  },
  {
    sequelize,
    modelName: "lease",
    scopes: {
      past: { where: { end: { [Op.lt]: new Date() } } },

      activeBetween(reqStart = new Date(), reqEnd = new Date()) {
        return {
          where: {
            [Op.or]: [
              { start: { [Op.between]: [reqStart, reqEnd] } },
              { end: { [Op.between]: [reqStart, reqEnd] } },
              {
                [Op.and]: [
                  { start: { [Op.lte]: reqStart } },
                  { end: { [Op.gte]: reqEnd } },
                ],
              },
            ],
          },
        };
      },

      future: { where: { start: { [Op.gt]: new Date() } } },
    },
  }
);

module.exports = Lease;
