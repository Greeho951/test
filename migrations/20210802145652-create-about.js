'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Abouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ourJourney: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      whyGreeho: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      ourMission: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      transparency: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      quality: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      accuracy: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Abouts');
  }
};