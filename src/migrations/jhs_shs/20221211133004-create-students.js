const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING(255),
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING(255),
        field: 'last_name'
      },
      otherName: {
        type: DataTypes.STRING(255),
        field: 'other_name'
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        field: 'date_of_birth'
      },
      religiousDenomition: {
        type: DataTypes.STRING(255),
        field: 'religious_denomition'
      },
      admissionDate: {
        type: DataTypes.DATEONLY,
        field: 'admission_date',
        defaultValue: DataTypes.NOW
      },
      photo: {
        type: DataTypes.TEXT,
        field: 'photo'
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'others'),
        field: 'gender'
      },
      status: {
        type: DataTypes.ENUM('active', 'blocked', 'pending'),
        field: 'status'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },
      schoolsId: {
        type: DataTypes.UUID,
        field: 'schools_id'
      },
      classesId: {
        type: DataTypes.UUID,
        field: 'classes_id'
      },
      parentsId: {
        type: DataTypes.UUID,
        field: 'parents_id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  },
};