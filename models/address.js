'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Address extends Model {

        // define association here
        static associate(models) {
            // Address.belongsTo(models.Country, { foreignKey: 'countryId', onDelete: 'CASCADE' });
            // Address.belongsTo(models.Division, { foreignKey: 'divisionId', onDelete: 'CASCADE' });
            // Address.belongsTo(models.District, { foreignKey: 'districtId', onDelete: 'CASCADE' });
            // Address.belongsTo(models.Thana, { foreignKey: 'thanaId', onDelete: 'CASCADE' });
            // Address.belongsTo(models.Area, { foreignKey: 'areaId', onDelete: 'CASCADE' });
            // Address.belongsTo(models.Village, { foreignKey: 'villageId', onDelete: 'CASCADE' });
            
            Address.hasMany(models.Property, { foreignKey: 'addressId', onDelete: 'CASCADE' });
        }
    };
    // COUNTRY -> DIVISION -> DISTRICT -> THANA -> AREA -> [BLOCK + SECTION + SECTOR] -> ROAD_NO -> BUILDING_NO 
    Address.init({
        country: DataTypes.STRING,
        division: DataTypes.STRING,
        district: DataTypes.STRING,
        thana: DataTypes.STRING,
        area: DataTypes.STRING,
        village: DataTypes.JSON,
        roadNo: DataTypes.STRING,
        houseNo: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Address',
    });
    return Address;
};