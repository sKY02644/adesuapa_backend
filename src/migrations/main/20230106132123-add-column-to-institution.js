'use strict';

const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('institutions', 'sub_category', {
      type: DataTypes.STRING(10)
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('institutions', 'sub_category')
  }
};
