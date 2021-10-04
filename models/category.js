'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    /* ASSOSIATION */
    static associate(models) {

      Category.hasMany(models.SubCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      Category.hasMany(models.Service, { foreignKey: 'categoryId', onDelete: 'CASCADE' });

    }
  };
  Category.init({
    categoryName: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};