'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {

    static associate(models) { };

  };
  Contact.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phnNo: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};