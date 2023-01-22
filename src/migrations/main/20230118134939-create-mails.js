const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mails', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      content: {
        type: DataTypes.JSON,
        field: 'content',
        allowNull: true
      },
      type: {
        type: DataTypes.ENUM('welcome_mail', 'confirmation_mail'),
        field: 'type',
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('failed', 'sent'),
        field: 'status',
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mails');
  },
};