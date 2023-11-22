"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, {
        foreignKey: "HostId",
      });
    }
  }
  Room.init(
    {
      HostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      passcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Passcode is required",
          },
          notEmpty: {
            args: true,
            msg: "Passcode is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "waiting"
      }
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
