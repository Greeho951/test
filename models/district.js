'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class District extends Model {

        // define association here
        static associate(models) {

            District.belongsTo(models.Division, { foreignKey: 'divisionId', onDelete: 'CASCADE'});
            District.hasMany(models.Thana, {foreignKey: 'districtId',onDelete: 'CASCADE',});
            // District.hasMany(models.Address, { foreignKey: 'districtId', onDelete: 'CASCADE'});

        }

    };
    District.init({
        district: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'District',
    });
    return District;
};