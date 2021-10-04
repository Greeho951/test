'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Badges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bachelorFriendly: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      brandNew: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      expatFriendly: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      femaleHostel: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      petFriendly: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      rentedOut: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      sold: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      premium: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      coLiving: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Badges');
  }
};