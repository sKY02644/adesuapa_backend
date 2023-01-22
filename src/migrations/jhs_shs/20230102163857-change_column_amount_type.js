'use strict';
const DataTypes = require('sequelize').DataTypes


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payment_histories',
      'amount',
      {
        type: DataTypes.FLOAT
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payment_histories',
      'amount',
      {
        type: DataTypes.STRING(255)
      }
    )
  }
};
