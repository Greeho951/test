'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phnNo: {
        type: Sequelize.STRING(17),
        allowNull: false,
      },
      approval: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      otp: {
        type: Sequelize.INTEGER,
        unique:true
      },
      verified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      forgotCode: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      forgotCodeVerify: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      userTypes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      rolesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      softDelete: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      superAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};