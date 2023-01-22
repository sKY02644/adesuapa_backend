'use strict';

const DataTypes = require("sequelize").DataTypes

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'payment_histories',
      'email',
        {
          type: DataTypes.STRING(255),
          field: 'email'
        }
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payment_histories', 'email')
  }
};
