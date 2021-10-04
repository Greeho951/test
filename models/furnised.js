'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Furnised extends Model {

    /* ASSOSIATION */
    static associate(models) {
      Furnised.hasOne(models.UnitInfo, { foreignKey: 'interiorId', onDelete: 'CASECADE' });
    }
  };
  Furnised.init({
    wood: DataTypes.STRING,
    closet: DataTypes.BOOLEAN,
    wallCabinet: DataTypes.BOOLEAN,
    bed: DataTypes.BOOLEAN,
    vanity: DataTypes.BOOLEAN,
    sofa: DataTypes.BOOLEAN,
    diningTable: DataTypes.BOOLEAN,
    chairs: DataTypes.BOOLEAN,
    coffeTable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Furnised',
  });
  return Furnised;
};