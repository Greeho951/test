'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Facilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      survailanceCamera: {
        type: Sequelize.STRING
      },
      solarPannel: {
        type: Sequelize.BOOLEAN
      },
      sharedGym: {
        type: Sequelize.BOOLEAN
      },
      sharedPool: {
        type: Sequelize.BOOLEAN
      },
      playGround: {
        type: Sequelize.BOOLEAN
      },
      communityHall: {
        type: Sequelize.BOOLEAN
      },
      rofftopGarden: {
        type: Sequelize.BOOLEAN
      },
      greenApartment: {
        type: Sequelize.BOOLEAN
      },
      fireSafty: {
        type: Sequelize.BOOLEAN
      },
      emergencyStairs: {
        type: Sequelize.BOOLEAN
      },
      driverLounge: {
        type: Sequelize.BOOLEAN
      },
      security: {
        type: Sequelize.INTEGER
      },
      reception: {
        type: Sequelize.BOOLEAN
      },
      buildingId:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
      status: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Facilities');
  }
};