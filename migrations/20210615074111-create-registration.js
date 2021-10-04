'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commercials: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      residentials: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      rajuk: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      unionCouncil: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Registrations');
  }
};