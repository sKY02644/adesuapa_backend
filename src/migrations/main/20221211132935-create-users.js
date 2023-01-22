const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      password: {
        type: DataTypes.STRING(255),
        field: 'password'
      },
      userName: {
        type: DataTypes.STRING(255),
        field: 'user_name',
        unique: true
      },
      email: {
        type: DataTypes.STRING(255),
        field: 'email',
        unique: true
      },
      address: {
        type: DataTypes.STRING(255),
        field: 'address'
      },
      loginDateTime: {
        type: DataTypes.DATE,
        field: 'login_date_time',
        defaultValue: DataTypes.NOW
      },
      contact: {
        type: DataTypes.STRING(20),
        field: 'contact'
      },
      ip: {
        type: DataTypes.STRING,
        field: 'ip'
      },
      rolePermission: {
        type: DataTypes.TEXT,
        field: 'role_permission'
      },
      status: {
        type: DataTypes.BOOLEAN,
        field: 'status'
      },
      country: {
        type: DataTypes.STRING(255),
        field: 'country'
      },
      countryCode: {
        type: DataTypes.STRING(255),
        field: 'country_code'
      },
      resetPasswordToken: {
        type: DataTypes.STRING(255),
        field: 'reset_password_token'
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
    await queryInterface.dropTable('users');
  },
};