'use strict';

const DataTypes = require('sequelize').DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('institutions', 'users_id_format', {
      type: DataTypes.STRING
    })
    await queryInterface.addColumn('institutions', 'settings', {
      type: DataTypes.JSON
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('institutions', 'users_id_format')
    await queryInterface.removeColumn('institutions', 'settings')
  }
};
