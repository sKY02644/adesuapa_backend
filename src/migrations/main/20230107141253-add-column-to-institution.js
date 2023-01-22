'use strict';

const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('institutions', 'status', {
      type: DataTypes.ENUM('active', 'blocked')
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('institutions', 'status')
  }
};
