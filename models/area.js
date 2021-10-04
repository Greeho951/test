'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {

    // define association here
    static associate(models) {
      Area.belongsTo(models.Thana, { foreignKey: 'thanaId', onDelete: 'CASCADE'});
      // Area.hasMany(models.Address, { foreignKey: 'areaId', onDelete: 'CASCADE'});
      Area.hasMany(models.Village, { foreignKey: 'areaId', onDelete: 'CASCADE'});
    }
  };
  Area.init({
    area: DataTypes.STRING,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};