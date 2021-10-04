'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    /* ASSOSIATION */
    static associate(models) {

      Role.belongsToMany(models.User, { through: 'UserRoles', foreignKey: 'roleId' });
      Role.belongsTo(models.User, { as: 'createBy', foreignKey: 'creatorId', onDelete: 'CASCADE' });
      Role.belongsTo(models.User, { as: 'updateBy',foreignKey: 'updatorId', onDelete: 'CASCADE' });

    }
  };
  Role.init({
    roleName: DataTypes.STRING,
    permission: DataTypes.JSON,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};