const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parents', {
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
      address: {
        type: DataTypes.STRING(255),
        field: 'address'
      },
      occupation: {
        type: DataTypes.STRING(255),
        field: 'occupation'
      },
      phoneNumber: {
        type: DataTypes.STRING(255),
        field: 'phone_number'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      studentsId: {
        type: DataTypes.UUID,
        field: 'students_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parents');
  },
};