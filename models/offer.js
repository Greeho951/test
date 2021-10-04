'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    // model relation
    static associate(models) {

      // Offer -> Offer_types
      Offer.belongsTo(models.Offer_types, {
        foreignKey: 'offer_types_id',
        onDelete: 'CASCADE',
      });
    }
  };
  Offer.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    status: DataTypes.INTEGER,
    soft_delete: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};