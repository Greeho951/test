'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offer_types_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      start_date: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      end_date: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      soft_delete: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    // {
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    // }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Offers');
  }
};