
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  /* ASSOAIATION */
  class Complain extends Model {

    static associate(models) {

      Complain.belongsTo(models.Property, { foreignKey: 'productId', constraints: false });
      Complain.belongsTo(models.Service, { foreignKey: 'productId', constraints: false });
      
      Complain.belongsTo(models.User, {as: 'complainCreateBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      Complain.belongsTo(models.User, {as: 'complainUpdateBy', foreignKey: 'updatorId', onDelete: 'CASCADE' });

      Complain.addHook("afterFind", findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.productType === "property" && instance.property !== undefined) {
            instance.product = instance.property;
          } else if (instance.productType === "service" && instance.service !== undefined) {
            instance.product = instance.service;
          }

          delete instance.property;
          delete instance.dataValues.property;
          delete instance.service;
          delete instance.dataValues.service;
        }
      });

    }
  }

  Complain.init({
    complains: DataTypes.JSON,
    productId: DataTypes.INTEGER,
    productType: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Complain',
  });
  return Complain;
};