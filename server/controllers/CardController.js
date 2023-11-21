const { Card } = require("../models/index");
const Sequelize = require("sequelize");

class CardController {
  static async randomCards(req, res, next) {
    try {
      const data = await Card.findAll({     // get 5 random cards from DB
        order: Sequelize.literal("random()"), 
        limit: 5,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CardController;
