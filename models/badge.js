'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Badge extends Model {

    static associate(models) {
      // define association here
    }
  };
  Badge.init({
    bachelorFriendly: DataTypes.BOOLEAN,
    brandNew: DataTypes.BOOLEAN,
    expatFriendly: DataTypes.BOOLEAN,
    femaleHostel: DataTypes.BOOLEAN,
    petFriendly: DataTypes.BOOLEAN,
    rentedOut: DataTypes.BOOLEAN,
    sold: DataTypes.BOOLEAN,
    premium: DataTypes.BOOLEAN,
    coLiving: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Badge',
  });
  return Badge;
};