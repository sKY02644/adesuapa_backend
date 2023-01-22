const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'users_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    // await queryInterface.addConstraint('users', {
    //   fields: ['institutions_id'],
    //   type: 'foreign key',
    //   name: 'users_institutions_id_fkey',
    //   references: {
    //     table: 'adesuapa.institutions',
    //     field: 'id'
    //   }
    // })
    
    // await queryInterface.addConstraint('schools', {
    //   fields: ['institutions_id'],
    //   type: '  key',
    //   name: 'schools_institutions_id_fkey',
    //   references: {
    //     table: 'adesuapa.institutions',
    //     field: 'id'
    //   }
    // })
    
    // await queryInterface.addConstraint('schools', {
    //   fields: ['countries_id'],
    //   type: 'foreign key',
    //   name: 'schools_countries_id_fkey',
    //   references: {
    //     table: 'adesuapa.countries',
    //     field: 'id'
    //   }
    // })
    
    await queryInterface.addConstraint('students', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'students_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('students', {
      fields: ['classes_id'],
      type: 'foreign key',
      name: 'students_classes_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('students', {
      fields: ['parents_id'],
      type: 'foreign key',
      name: 'students_parents_id_fkey',
      references: {
        table: 'parents',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('teachers', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'teachers_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('teachers', {
      fields: ['classes_id'],
      type: 'foreign key',
      name: 'teachers_classes_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('parents', {
      fields: ['students_id'],
      type: 'foreign key',
      name: 'parents_students_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('bills', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'bills_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('bills', {
      fields: ['classes_id'],
      type: 'foreign key',
      name: 'bills_classes_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('academic_years', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'academic_years_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('classes', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'classes_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('grading_systems', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'grading_systems_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('grading_systems', {
      fields: ['classes_id'],
      type: 'foreign key',
      name: 'grading_systems_classes_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    // await queryInterface.addConstraint('subscriptions', {
    //   fields: ['institutions_id'],
    //   type: 'foreign key',
    //   name: 'subscriptions_institutions_id_fkey',
    //   references: {
    //     table: 'adesuapa.institutions',
    //     field: 'id'
    //   }
    // })
    
    await queryInterface.addConstraint('subscription_histories', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'subscription_histories_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('buses', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'buses_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('sms_credits', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'sms_credits_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('subjects', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'subjects_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('subjects', {
      fields: ['classes_id'],
      type: 'foreign key',
      name: 'subjects_classes_id_fkey',
      references: {
        table: 'classes',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('subjects', {
      fields: ['teachers_id'],
      type: 'foreign key',
      name: 'subjects_teachers_id_fkey',
      references: {
        table: 'teachers',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('subjects', {
      fields: ['students_id'],
      type: 'foreign key',
      name: 'subjects_students_id_fkey',
      references: {
        table: 'students',
        field: 'id'
      }
    })
    
    await queryInterface.addConstraint('settings', {
      fields: ['schools_id'],
      type: 'foreign key',
      name: 'settings_schools_id_fkey',
      references: {
        table: 'schools',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('users', 'users_schools_id_fkey')
    // await queryInterface.removeConstraint('users', 'users_institutions_id_fkey')
    // await queryInterface.removeConstraint('schools', 'schools_institutions_id_fkey')
    // await queryInterface.removeConstraint('schools', 'schools_countries_id_fkey')
    await queryInterface.removeConstraint('students', 'students_schools_id_fkey')
    await queryInterface.removeConstraint('students', 'students_classes_id_fkey')
    await queryInterface.removeConstraint('students', 'students_parents_id_fkey')
    await queryInterface.removeConstraint('teachers', 'teachers_schools_id_fkey')
    await queryInterface.removeConstraint('teachers', 'teachers_classes_id_fkey')
    await queryInterface.removeConstraint('parents', 'parents_students_id_fkey')
    await queryInterface.removeConstraint('bills', 'bills_schools_id_fkey')
    await queryInterface.removeConstraint('bills', 'bills_classes_id_fkey')
    await queryInterface.removeConstraint('academic_years', 'academic_years_schools_id_fkey')
    await queryInterface.removeConstraint('classes', 'classes_schools_id_fkey')
    await queryInterface.removeConstraint('grading_systems', 'grading_systems_schools_id_fkey')
    await queryInterface.removeConstraint('grading_systems', 'grading_systems_classes_id_fkey')
    // await queryInterface.removeConstraint('subscriptions', 'subscriptions_institutions_id_fkey')
    await queryInterface.removeConstraint('subscription_histories', 'subscription_histories_schools_id_fkey')
    await queryInterface.removeConstraint('buses', 'buses_schools_id_fkey')
    await queryInterface.removeConstraint('sms_credits', 'sms_credits_schools_id_fkey')
    await queryInterface.removeConstraint('subjects', 'subjects_schools_id_fkey')
    await queryInterface.removeConstraint('subjects', 'subjects_classes_id_fkey')
    await queryInterface.removeConstraint('subjects', 'subjects_teachers_id_fkey')
    await queryInterface.removeConstraint('subjects', 'subjects_students_id_fkey')
    await queryInterface.removeConstraint('settings', 'settings_schools_id_fkey')
  }
};