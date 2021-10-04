'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    /* ASSOSIATION */
    static associate(models) {

      User.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'userId', });
      User.hasMany(models.Ratting, { foreignKey: 'userId', onDelete: 'CASCADE', });
      /* HowToOrder */
      User.hasMany(models.HowToOrder, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
      User.hasMany(models.HowToOrder, { foreignKey: 'updatorId', onDelete: 'CASCADE' });
      /* Complain */
      User.hasMany(models.Complain, { as: 'complainCreateBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      User.hasMany(models.Complain, { as: 'complainUpdateBy', foreignKey: 'updatorId', onDelete: 'CASCADE' });
      /* Role */
      User.hasMany(models.Role, { as: 'createBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      User.hasMany(models.Role, { as: 'updateBy', foreignKey: 'updatorId', onDelete: 'CASCADE' });
      /* Service */
      User.hasMany(models.Service, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
      User.hasMany(models.Service, { foreignKey: 'updatorId', onDelete: 'CASCADE' });
      /* Service */
      User.hasOne(models.Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
      /* About */
      User.hasMany(models.About, { as: 'aboutCreateBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      User.hasMany(models.About, { as: 'aboutUpdateBy', foreignKey: 'updatorId', onDelete: 'CASCADE' });
      /* PROPERTY */
      User.hasMany(models.Property, { foreignKey: 'listingBy', onDelete: 'CASCADE' });
    }
  };

  User.init({
    profileImage: {
      type: DataTypes.STRING,
      get() {
        const path = this.getDataValue("profile");
        const pathSplit = path ? path.split("/") : null
        const profileUrl = path ? 'profile' + '/' + pathSplit[2] : null
        return profileUrl;
      }
    },
    userName: DataTypes.STRING,
    phnNo: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN,
    forgotCode: DataTypes.UUID,
    approval: DataTypes.BOOLEAN,
    forgotCodeVerify: DataTypes.BOOLEAN,
    rolesId: DataTypes.INTEGER,
    userTypes: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    softDelete: DataTypes.STRING,
    superAdmin: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};