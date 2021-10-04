'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilities extends Model {

    /* ASSOSIATION */
    static associate(models) {

      // Utilities.hasOne(models.BuildingInfo, { foreignKey: 'utilitiesId', onDelete: 'CASECADE' });
      // Utilities.hasOne(models.LiftAC, { foreignKey: 'liftACId', onDelete: 'CASECADE' });

    }
  };
  Utilities.init({
    electricity: DataTypes.BOOLEAN,
    water: DataTypes.STRING,
    generator: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    emergencyStreais: DataTypes.BOOLEAN,
    lift: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Utilities',
  });
  return Utilities;
};