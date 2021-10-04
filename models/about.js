'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {

    /* ASSOSIATION */
    static associate(models) {

      About.belongsTo(models.User, { as: 'aboutCreateBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      About.belongsTo(models.User, { as: 'aboutUpdateBy', foreignKey: 'updatorId', onDelete: 'CASCADE' });

    }
  };
  About.init({
    ourJourney: DataTypes.STRING,
    whyGreeho: DataTypes.STRING,
    ourMission: DataTypes.STRING,
    transparency: DataTypes.STRING,
    quality: DataTypes.STRING,
    accuracy: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'About',
  });
  return About;
};