'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactInfo extends Model {

    /* ASSOSIATION */
    static associate(models) {

      ContactInfo.belongsTo(models.Property, { foreignKey: 'propertyId', onDelete: 'CASCADE' });

    }
  };
  ContactInfo.init({
    contactName: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    contactDesignation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ContactInfo',
  });
  return ContactInfo;
};