'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Utilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      electricity: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true,
      },
      water: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      generator: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: true,
      },
      emergencyStreais: {
        type: Sequelize.BOOLEAN
      },
      lift: {
        type: Sequelize.INTEGER,
        allowNull:false,
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
    await queryInterface.dropTable('Utilities');
  }
};