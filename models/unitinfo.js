'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnitInfo extends Model {

    /* ASSOSIATION */
    static associate(models) {
      //Equipment+Parking+

      UnitInfo.belongsTo(models.Property, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
      
      UnitInfo.belongsTo(models.Equipment, { foreignKey: 'equipmentId', onDelete: 'CASECADE' });
      UnitInfo.belongsTo(models.Furnised, { foreignKey: 'interiorId', onDelete: 'CASECADE' });
      UnitInfo.hasOne(models.Parking, { foreignKey: 'parkingId', constraints: false, scope: { parkingType: 'unitInfo' } });
      UnitInfo.hasMany(models.LiftAC, { foreignKey: 'refId', constraints: false, scope: { productType: 'unitInfo' } });

      UnitInfo.hasOne(models.Property, { foreignKey: 'unitId', onDelete: 'CASECADE' });

    }
  };
  UnitInfo.init({
    landlordName: DataTypes.STRING,
    landlordNumber: DataTypes.INTEGER,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    serviceCharge: DataTypes.INTEGER,
    securityDeposit: DataTypes.INTEGER,
    commonSpace: DataTypes.INTEGER,
    carpetSpace: DataTypes.INTEGER,
    liveableSpace: DataTypes.INTEGER,
    bed: DataTypes.INTEGER,
    servantBed: DataTypes.INTEGER,
    bath: DataTypes.INTEGER,
    servantBath: DataTypes.INTEGER,
    balcony: DataTypes.INTEGER,
    kitchen: DataTypes.INTEGER,
    kitchenCabinet: DataTypes.BOOLEAN,
    kitchenHood: DataTypes.BOOLEAN,
    washroom: DataTypes.INTEGER,
    facing: DataTypes.STRING,
    maxOccupantsAllow: DataTypes.INTEGER,
    pet: DataTypes.JSON,
    vacent: DataTypes.BOOLEAN,
    vacentScience: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'UnitInfo',
  });
  return UnitInfo;
};