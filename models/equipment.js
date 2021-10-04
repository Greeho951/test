'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {

    /* ASSOSIATION */
    static associate(models) {
    
    }
  };
  Equipment.init({
    fan: DataTypes.INTEGER,
    light: DataTypes.BOOLEAN,
    cctv: DataTypes.BOOLEAN,
    geyser: DataTypes.INTEGER,
    stove: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};