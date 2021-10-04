'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {

    // define association here
    static associate(models) {

      // Registration.hasOne(models.BuildingInfo, {
      //   foreignKey: 'registrationId',
      //   onDelete: 'CASECADE',
      // });

    }
  };
  Registration.init({
    commercials: DataTypes.BOOLEAN,
    residentials: DataTypes.BOOLEAN,
    rajuk: DataTypes.BOOLEAN,
    unionCouncil: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Registration',
  });
  return Registration;
};