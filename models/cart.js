'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    /*ASSOSIATION */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  };
  Cart.init({
    services: DataTypes.JSON,
    payment: DataTypes.BOOLEAN,
    conform: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};