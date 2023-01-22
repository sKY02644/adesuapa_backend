'use strict';

const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payment_histories', 
      'schools_id',
      {
        type: DataTypes.UUID,
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'payment_histories', 
      'schools_id',
      {
        type: DataTypes.UUID,
        allowNull: false
      }
    )
  }
};
