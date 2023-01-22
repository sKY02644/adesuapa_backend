'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('settings', 'schools_id')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addConstraint('settings', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'settings_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
  }
};
