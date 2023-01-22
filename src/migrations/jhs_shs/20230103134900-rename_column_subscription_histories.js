'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('subscription_histories', 'startDate', 'start_date')
    await queryInterface.renameColumn('subscription_histories', 'endDate', 'end_date')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('subscription_histories', 'start_date', 'startDate')
    await queryInterface.renameColumn('subscription_histories', 'end_date', 'endDate')
  }
};
