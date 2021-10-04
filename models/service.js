'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {

    /* ASSOSIATION */
    static associate(models) {

      // Service.hasMany(models.Cart, { foreignKey: 'serviceId', onDelete: 'CASCADE'});
      Service.belongsTo(models.Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
      Service.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId', onDelete: 'CASCADE' });
      Service.belongsTo(models.User, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
      Service.belongsTo(models.User, { foreignKey: 'updatorId', onDelete: 'CASCADE' });
      Service.hasMany(models.Complain, { foreignKey: 'productId', constraints: false, scope: { productType: 'service' } });

    }

  };
  Service.init({
    //category
    //order system
    //ratting
    //compalin
    //start-at
    //total-price
    //review
    headline: DataTypes.STRING,
    overview: DataTypes.STRING,
    safetyEnsured: DataTypes.JSON,
    expectation: DataTypes.JSON,
    notExpectation: DataTypes.JSON,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    availability: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    soft_delete: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};