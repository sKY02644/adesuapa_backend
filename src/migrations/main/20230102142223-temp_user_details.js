'use strict';

const DataTypes = require('sequelize').DataTypes

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, sequelize) {

    await queryInterface.createTable('temp_users_details', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(255),
        field: 'name'
      },
      email: {
        type: DataTypes.STRING(255),
        field: 'email',
        unique: true,
      },
      institutionName: {
        type: DataTypes.STRING(255),
        field: 'institution_name'
      },
      phoneNumber: {
        type: DataTypes.STRING(255),
        field: 'phone_number'
      },
      selectedInstitution: {
        type: DataTypes.UUID,
        field: 'selected_institution'
      },
      selectedSubscription: {
        type: DataTypes.UUID,
        field: 'selected_subscription'
      },
      selectedCountry: {
        type: DataTypes.UUID,
        field: 'selected_country'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('temp_users_details')
  }
};
