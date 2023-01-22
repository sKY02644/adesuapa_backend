const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // await queryInterface.addConstraint('users', {
    //   fields: ['institutions_id'],
    //   type: 'foreign key',
    //   name: 'users_institutions_id_fkey',
    //   references: {
    //     table: 'institutions',
    //     field: 'id'
    //   }
    // })
    
    // await queryInterface.addConstraint('subscriptions', {
    //   fields: ['institutions_id'],
    //   type: 'foreign key',
    //   name: 'subscriptions_institutions_id_fkey',
    //   references: {
    //     table: 'institutions',
    //     field: 'id'
    //   }
    // })
    
    // await queryInterface.addConstraint('settings', {
    //   fields: ['schools_id'],
    //   type: 'foreign key',
    //   name: 'settings_schools_id_fkey',
    //   references: {
    //     table: 'schools',
    //     field: 'id'
    //   }
    // })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'users_institutions_id_fkey')
    await queryInterface.removeConstraint('subscriptions', 'subscriptions_institutions_id_fkey')
    await queryInterface.removeConstraint('settings', 'settings_schools_id_fkey')
  }
};