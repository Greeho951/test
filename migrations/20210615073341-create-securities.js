'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Securities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gurds: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      socialSecurity: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      fireSafty: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      communityGurd: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      surveillanceCammera: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
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
    await queryInterface.dropTable('Securities');
  }
};