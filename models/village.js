'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {

    /* ASSOSIATION */
    static associate(models) {
      Village.belongsTo(models.Area, { foreignKey: 'areaId', onDelete: 'CASCADE'});
      // Village.hasMany(models.Address, { foreignKey: 'villageId', onDelete: 'CASCADE'});
    }
  };
  Village.init({
    block: DataTypes.STRING,
    section: DataTypes.STRING,
    sector: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Village',
  });
  return Village;
};