'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {

    // define association here
    static associate(models) {

      Country.hasMany(models.Division, { foreignKey: 'countryId', onDelete: 'CASCADE' });
      // Country.hasMany(models.Address, { foreignKey: 'countryId', onDelete: 'CASCADE' });

    }
  };
  Country.init({
    country: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};