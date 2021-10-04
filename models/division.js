'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {

    // define association here
    static associate(models) {

      Division.belongsTo(models.Country, { foreignKey: 'countryId', onDelete: 'CASCADE', });
      Division.hasMany(models.District, { foreignKey: 'divisionId', onDelete: 'CASCADE', });
      // Division.hasMany(models.Address, { foreignKey: 'divisionId', onDelete: 'CASCADE' });

    }
  };
  Division.init({
    division: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Division',
  });
  return Division;
};