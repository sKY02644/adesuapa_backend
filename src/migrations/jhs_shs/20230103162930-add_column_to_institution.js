'use strict';

const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('institutions', 'category', {
      type: DataTypes.STRING(10)
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('institutions', 'category')
  }
};
