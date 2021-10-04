'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratting extends Model {

    // define association here
    static associate(models) {
      Ratting.belongsTo(models.User, {foreignKey: 'userId',onDelete: 'CASCADE',});

      Ratting.belongsTo(models.Property, { foreignKey: 'rattingId', constraints: false });
      Ratting.belongsTo(models.UnitInfo, { foreignKey: 'rattingId', constraints: false });

      Ratting.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
            if (instance.rattingType === "property" && instance.property !== undefined) {
                instance.ratting = instance.property;
            } else if (instance.rattingType === "unit" && instance.unit !== undefined) {
                instance.ratting = instance.unit;
            }

            delete instance.property;
            delete instance.dataValues.property;
            delete instance.unit;
            delete instance.dataValues.unit;
        }
    });
    }
  };
  Ratting.init({
    ratting: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Ratting',
  });
  return Ratting;
};