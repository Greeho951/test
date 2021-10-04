'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {

    /* ASSOSIATION */
    static associate(models) {
      Parking.belongsTo(models.UnitInfo, { foreignKey: 'parkingId', constraints: false });
      Parking.belongsTo(models.BuildingInfo, { foreignKey: 'parkingId', constraints: false });

      Parking.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.parkingType === "unitInfo" && instance.unitInfo !== undefined) {
            instance.parking = instance.unitInfo;
          } else if (instance.parkingType === "buildingInfo" && instance.buildingInfo !== undefined) {
            instance.parking = instance.buildingInfo;
          }

          delete instance.unitInfo;
          delete instance.dataValues.unitInfo;
          delete instance.buildingInfo;
          delete instance.dataValues.buildingInfo;
        }
      });
    }
  };
  Parking.init({
    type: DataTypes.STRING,
    size: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    parkingType: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Parking',
  });
  return Parking;
};