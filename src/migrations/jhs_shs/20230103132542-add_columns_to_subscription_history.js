'use strict';

const DataTypes = require("sequelize").DataTypes

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'subscription_histories',
      'active',
        {
          type: DataTypes.BOOLEAN,
          field: 'active'
        }
      )

    await queryInterface.addColumn(
    'subscription_histories',
    'startDate',
      {
        type: DataTypes.DATE,
        field: 'start_date'
      }
    )

      await queryInterface.addColumn(
      'subscription_histories',
      'endDate',
        {
          type: DataTypes.DATE,
          field: 'end_date'
        }
      )

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('subscription_histories', 'active')
    await queryInterface.removeColumn('subscription_histories', 'start_date')
    await queryInterface.removeColumn('subscription_histories', 'end_date')

  }
};
