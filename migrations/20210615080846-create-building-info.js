'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BuildingInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      propertyType:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      supportList:{
        type: Sequelize.JSON,
        allowNull: false,
      },
      totalArea: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      areaCovered: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalFloor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalUnit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitPerFloor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      buildYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      developerCompany: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rajukApproval:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      frontRoadSize: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      buildingFacing:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      nearByLandMark: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mostRequiredService: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      electricity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      water: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      areaFacilities:{
        type: Sequelize.JSON,
      },
      basicRules:{
        type: Sequelize.JSON,
      },
      commercialRules:{
        type: Sequelize.JSON,
      },
      illegalIssue:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValues:false,
      },
      propertyId:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        defaultValues:true,
      },
      softDelete:{
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        defaultValues:false,
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
    await queryInterface.dropTable('BuildingInfos');
  }
};