'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('payment_history', 'payment_histories')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('payment_histories', 'payment_history')
  }
};
