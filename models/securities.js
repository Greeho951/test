'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Securities extends Model {

    // define association here
    static associate(models) {

      // Securities.hasOne(models.BuildingInfo, {
      //   foreignKey: 'securitiesId',
      //   onDelete: 'CASECADE',
      // });
    }
  };
  Securities.init({
    gurds: DataTypes.INTEGER,
    socialSecurity: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    fireSafty: DataTypes.BOOLEAN,
    communityGurd: DataTypes.INTEGER,
    surveillanceCammera: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Securities',
  });
  return Securities;
};