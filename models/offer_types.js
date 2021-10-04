'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer_types extends Model {

    // model relation 
    static associate(models) {

      // Offer -> Offer_types
      Offer_types.hasMany(models.Offer, {
        foreignKey: 'offer_types_id'
      });

    }
  };
  Offer_types.init({
    offer_title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    soft_delete: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Offer_types',
  });
  return Offer_types;
};