'use strict';
const DataTypes = require('sequelize').DataTypes

// update
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'users',
      'role_permission',
      {
        type: DataTypes.JSON
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'users',
      'role_permission',
      {
        type: DataTypes.TEXT
      }
    )
  }
};
