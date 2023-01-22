const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries', {
      name: {
        type: DataTypes.STRING(255),
        field: 'name',
        unique: true
      },
      code: {
        type: DataTypes.STRING(255),
        field: 'code'
      },
      status: {
        type: DataTypes.ENUM('active', 'blocked', 'pending'),
        field: 'status'
      },
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('countries');
  },
};