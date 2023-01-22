const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schools', {
      name: {
        type: DataTypes.STRING(255),
        field: 'name'
      },
      address: {
        type: DataTypes.STRING(255),
        field: 'address'
      },
      phoneNumbers: {
        type: DataTypes.STRING(255),
        field: 'phone_numbers'
      },
      motto: {
        type: DataTypes.STRING(255),
        field: 'motto'
      },
      cityTown: {
        type: DataTypes.STRING(255),
        field: 'city_town'
      },
      initials: {
        type: DataTypes.STRING(255),
        field: 'initials'
      },
      crest: {
        type: DataTypes.TEXT,
        field: 'crest'
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
      },
      institutionsId: {
        type: DataTypes.UUID,
        field: 'institutions_id'
      },
      countriesId: {
        type: DataTypes.UUID,
        field: 'countries_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('schools');
  },
};