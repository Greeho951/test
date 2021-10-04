'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HowToOrder extends Model {
    
    static associate(models) {

      HowToOrder.belongsTo(models.User,{foreignKey: 'creatorId',onDelete: 'CASCADE'});
      HowToOrder.belongsTo(models.User,{foreignKey: 'updatorId',onDelete: 'CASCADE'});
    
    }

  };
  HowToOrder.init({
    title: DataTypes.STRING,
    steps: DataTypes.JSON,
    creatorId:DataTypes.INTEGER,
    updatorId:DataTypes.INTEGER,
    status:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'HowToOrder',
  });
  return HowToOrder;
};