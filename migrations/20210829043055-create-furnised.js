'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Furniseds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      closet: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      wallCabinet: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      bed: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      vanity: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      sofa: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      diningTable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      chairs: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      coffeTable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
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
    await queryInterface.dropTable('Furniseds');
  }
};