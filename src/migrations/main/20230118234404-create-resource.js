const DataTypes = require('sequelize').DataTypes
//
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resources', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      resource: {
        type: DataTypes.JSON,
        field: 'resource',
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('active', 'blocked'),
        field: 'status',
        allowNull: false
      },
      institution_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'institutions',
          key: 'id',
        }
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
    await queryInterface.dropTable('resources');
  },
};