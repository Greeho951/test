'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuildingInfo extends Model {

    /* ASSOSIATION */
    static associate(models) {

      BuildingInfo.hasMany(models.LiftAC, { foreignKey: 'refId', constraints: false, scope: { productType: 'buildingInfo' } });
      BuildingInfo.hasOne(models.Parking, { foreignKey: 'parkingId', constraints: false, scope: { parkingType: 'buildingInfo' } });
      BuildingInfo.belongsTo(models.Property, { foreignKey: 'propertyId', onDelete: 'CASECADE' });
      BuildingInfo.hasOne(models.Facilities, { foreignKey: 'buildingId', onDelete: 'CASECADE' });

    }
  };
  BuildingInfo.init({
    propertyType: DataTypes.STRING,
    supportList: DataTypes.JSON,
    totalArea: DataTypes.FLOAT,
    areaCovered: DataTypes.FLOAT,
    totalFloor: DataTypes.INTEGER,
    totalUnit: DataTypes.INTEGER,
    unitPerFloor: DataTypes.INTEGER,
    buildYear: DataTypes.INTEGER,
    developerCompany: DataTypes.STRING,
    rajukApproval: DataTypes.BOOLEAN,
    frontRoadSize: DataTypes.FLOAT,
    buildingFacing: DataTypes.STRING,
    nearByLandMark: DataTypes.STRING,
    mostRequiredService: DataTypes.STRING,
    gas: DataTypes.STRING,
    electricity: DataTypes.STRING,
    water: DataTypes.INTEGER,
    areaFacilities: DataTypes.JSON,
    basicRules: DataTypes.JSON,
    commercialRules: DataTypes.JSON,
    illegalIssue: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    softDelete: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'BuildingInfo',
  });
  return BuildingInfo;
};