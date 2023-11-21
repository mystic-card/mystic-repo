"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let heroes = fs.readFileSync("./data/heroes.json", "utf-8");
    heroes = JSON.parse(heroes);

    heroes.forEach((hero) => {
      delete hero.hero_specially;
      hero.operator = Math.random() < 0.5; // random true or false possibility 50%
      hero.power = Math.floor(Math.random() * 30 + 1) * 1000; // random integer range 1-30 x 1000
      hero.createdAt = new Date();
      hero.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Cards", heroes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
  },
};
