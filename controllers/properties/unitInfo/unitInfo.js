const UnitInfo = require('../../../models').UnitInfo;
const Property = require('../../../models').Property;
const Equipment = require('../../../models').Equipment;
const Furnised = require('../../../models').Furnised;
const LiftAC = require('../../../models').LiftAC;
const Parking = require('../../../models').Parking;
const { _response } = require('../../../utils/functions/response');
var Sequelize = require('sequelize');


exports.post = async (req, res) => {
    let {
        landlordName,
        landlordNumber,
        type,
        price,
        serviceCharge,
        securityDeposit,
        commonSpace,
        carpetSpace,
        liveableSpace,
        bed,
        servantBed,
        bath,
        servantBath,
        balcony,
        kitchen,
        kitchenCabinet,
        kitchenHood,
        washroom,
        facing,
        maxOccupantsAllow,
        pet,
        vacent,
        vacentScience,
        propertyId
    } = req.body;
    const condition = { where: { id: propertyId } }

    try {
        /* CREATE_UNITINFO */
        const unitInfo = await UnitInfo.create({
            landlordName,
            landlordNumber,
            type,
            price,
            serviceCharge,
            securityDeposit,
            commonSpace,
            carpetSpace,
            liveableSpace,
            bed,
            servantBed,
            bath,
            servantBath,
            balcony,
            kitchen,
            kitchenCabinet,
            kitchenHood,
            washroom,
            facing,
            maxOccupantsAllow,
            pet,
            vacent,
            vacentScience,
            propertyId
        });

        if (!unitInfo) { return res.status(200).json({ message: _response.failed }) };
        const property = await Property.findOne(condition);
        const updatePercentage = property.dataValues.percentage + parseInt(process.env.PERCENTAGE_2);
        const propertyUpdate = await property.update({ percentage: updatePercentage });
        if (!propertyUpdate) { return res.status(200).json({ message: _response.failed }) };

        return res.status(200).json({ unitInfo, propertyUpdate });

    } catch (error) { console.log(error) }
}

exports.update = async (req, res) => {

    let {
        bed,
        bath,
        balcony,
        interior,
        floor,
        units,
        gas,
        totalArea,
        liveableArea,
        commonArea,
        facing,
        vacentScience,
        washroom,
        furnishet,
        roofToop,
        kitchen,
        rentType,
        notes,
        mostRequiredService,
        maxOccupantsAllow
    } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* UPDATE */
        const unitInfo = await UnitInfo.update({
            bed,
            bath,
            balcony,
            interior,
            floor,
            units,
            gas,
            totalArea,
            liveableArea,
            commonArea,
            facing,
            vacentScience,
            washroom,
            furnishet,
            roofToop,
            kitchen,
            rentType,
            notes,
            mostRequiredService,
            maxOccupantsAllow,
        }, { where: condition });
        if (!unitInfo) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE */
        const unitInfo = await UnitInfo.destroy({ where: condition });

        if (unitInfo === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (unitInfo === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.getDetails = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const unitInfo = await UnitInfo.findOne({
            where: condition,
            include: [
                { model: Equipment },
                { model: Furnised },
                { model: LiftAC },
                { model: Parking }
            ],
        });

        if (unitInfo) {
            return res.status(200).json({ unitInfo });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
}
