'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buildingName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:null,
      },
      // contactId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unitId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      buildingId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      listingBy:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      softDelete:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    await queryInterface.dropTable('Properties');
  }
};