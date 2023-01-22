'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'user_name', 'user_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'user_id', 'user_name');

  }
};
