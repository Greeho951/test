'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    //association
    static associate(models) {
      
    }
  };
  Review.init({
    review: DataTypes.STRING,
    reviewer:DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};