'use strict';
const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, sequelize) => {
    // > id, user_id, type, amount, authorization_url, access_code, reference, status, payment_type
    await queryInterface.createTable('payment_history', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id'
      },
      paymentType: {
        type: DataTypes.STRING,
        field: 'payment_type'
      },
      amount: {
        type: DataTypes.STRING,
        field: 'amount'
      },
      authorizationUrl: {
        type: DataTypes.STRING,
        field: 'authorization_url'
      },
      accessCode: {
        type: DataTypes.STRING,
        field: 'access_code'
      },
      reference: {
        type: DataTypes.STRING,
        field: 'reference'
      },
      webHookResponse: {
        type: DataTypes.JSON,
        field: 'webhook_response'
      },
      status: {
        type: DataTypes.ENUM('pending', 'success', 'failed')
      },
      schools_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'schools',
          key: 'id',
          as: 'schools_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('payment_history');
  }
}