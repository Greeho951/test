'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facilities extends Model {

    // define association here
    static associate(models) {

      Facilities.belongsTo(models.BuildingInfo, {foreignKey: 'buildingId',onDelete: 'CASECADE'});

    }
  };
  Facilities.init({
    survailanceCamera: DataTypes.STRING,
    solarPannel: DataTypes.BOOLEAN,
    sharedGym: DataTypes.BOOLEAN,
    sharedPool: DataTypes.BOOLEAN,
    playGround: DataTypes.BOOLEAN,
    communityHall: DataTypes.BOOLEAN,
    rofftopGarden: DataTypes.BOOLEAN,
    greenApartment: DataTypes.BOOLEAN,
    fireSafty: DataTypes.BOOLEAN,
    emergencyStairs: DataTypes.BOOLEAN,
    driverLounge: DataTypes.BOOLEAN,
    security: DataTypes.INTEGER,
    reception: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Facilities',
  });
  return Facilities;
};