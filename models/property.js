'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {

    /* ASSOSIATION */
    static associate(models) {

      Property.belongsTo(models.User, { foreignKey: 'listingBy', onDelete: 'CASCADE' });
      Property.hasMany(models.ContactInfo, { foreignKey: 'propertyId', onDelete: 'CASCADE' });


      Property.belongsTo(models.Address, { foreignKey: 'addressId', onDelete: 'CASCADE' });
      Property.hasMany(models.UnitInfo, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
      Property.hasOne(models.BuildingInfo, { foreignKey: 'propertyId', onDelete: 'CASECADE', });
      Property.belongsTo(models.UnitInfo, { foreignKey: 'unitId', onDelete: 'CASECADE', });
      Property.hasMany(models.Complain, { foreignKey: 'productId', constraints: false, scope: { productType: 'property' } });
      Property.hasMany(models.Ratting, { foreignKey: 'rattingId', constraints: false, scope: { complainType: 'property' } });

      

    }
  };
  Property.init({
    buildingName: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    ownerNumber: DataTypes.STRING,
    percentage:DataTypes.INTEGER,
    softDelete:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};