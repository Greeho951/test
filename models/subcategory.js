'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {

    /* ASSOSIATION */
    static associate(models) {

      SubCategory.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      SubCategory.hasOne(models.Service, { foreignKey: 'subCategoryId', onDelete: 'CASCADE' });
      
    }
  };
  SubCategory.init({
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};