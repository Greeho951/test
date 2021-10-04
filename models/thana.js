'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thana extends Model {

    // define association here
    static associate(models) {

      Thana.belongsTo(models.District, { foreignKey: 'districtId', onDelete: 'CASCADE' });
      Thana.hasMany(models.Area, { foreignKey: 'thanaId', onDelete: 'CASCADE' });
      // Thana.hasMany(models.Address, { foreignKey: 'thanaId', onDelete: 'CASCADE' });

    }
  };
  Thana.init({
    thana: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Thana',
  });
  return Thana;
};