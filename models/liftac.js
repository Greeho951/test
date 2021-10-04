'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LiftAC extends Model {

    getProduct(options) {
      if (!this.productType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.productType)}`;
      return this[mixinMethodName](options);
    }

    /* ASSOSIATION */
    static associate(models) {

      LiftAC.belongsTo(models.UnitInfo, { foreignKey: 'refId', constraints: false });
      LiftAC.belongsTo(models.BuildingInfo, { foreignKey: 'refId', constraints: false });

      LiftAC.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.productType === "unitInfo" && instance.unitInfo !== undefined) {
            instance.product = instance.unitInfo;
          } else if (instance.productType === "buildingInfo" && instance.buildingInfo !== undefined) {
            instance.product = instance.buildingInfo;
          }

          delete instance.unitInfo;
          delete instance.dataValues.unitInfo;
          delete instance.buildingInfo;
          delete instance.dataValues.buildingInfo;
        }
      });

    }
  };
  LiftAC.init({
    total: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    capacity: DataTypes.FLOAT,
    lastService: DataTypes.DATE,
    nextService: DataTypes.DATE,
    productType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LiftAC',
  });
  return LiftAC;
};