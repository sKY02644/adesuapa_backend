const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // await queryInterface.removeConstraint("subscriptions", "subscriptions_institutions_id_fkey")
    // await queryInterface.removeConstraint("schools", "schools_countries_id_fkey")
    // await queryInterface.removeConstraint("schools", "schools_institutions_id_fkey")
    // await queryInterface.removeConstraint("users", "users_institutions_id_fkey")//

    await queryInterface.dropTable('countries');
    await queryInterface.dropTable('payment_methods');
    await queryInterface.dropTable('subscriptions');
    await queryInterface.dropTable('institutions');
    await queryInterface.dropTable('temp_users_details')

  },
  down: async (queryInterface, Sequelize) => {},
};