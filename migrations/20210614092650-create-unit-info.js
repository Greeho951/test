'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UnitInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      landlordName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      landlordNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,//rentORsell
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      serviceCharge: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      securityDeposit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      commonSpace: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      carpetSpace: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      liveableSpace: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bed: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      servantBed: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bath: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      servantBath: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      balcony: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kitchen: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kitchenCabinet: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      kitchenHood: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      washroom: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      facing: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maxOccupantsAllow: {
        type: Sequelize.INTEGER
      },
      pet: {
        type: Sequelize.JSON,
        allowNull: false
      },
      vacentScience: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      vacent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
      },
      equipmentId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      interiorId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('UnitInfos');
  }
};