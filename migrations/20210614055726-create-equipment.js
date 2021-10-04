'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Equipment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fan: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      light: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      cctv: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,  
      },
      geyser: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      stove: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable('Equipment');
  }
};