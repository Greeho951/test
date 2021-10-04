'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {

    // define association here
    static associate(models) {

    }
  };
  Resource.init({
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};