const { Op } = require("sequelize");
const User = require('../../../models').User;
const LiftAC = require('../../../models').LiftAC;
const Parking = require('../../../models').Parking;
const Address = require('../../../models').Address;
const UnitInfo = require('../../../models').UnitInfo;
const Property = require('../../../models').Property;
const Furnised = require('../../../models').Furnised;
const Equipment = require('../../../models').Equipment;
const Facilities = require('../../../models').Facilities;
const { validationResult } = require('express-validator');
const ContactInfo = require('../../../models').ContactInfo;
const BuildingInfo = require('../../../models').BuildingInfo;
const { _response } = require('../../../utils/functions/response');
const { phnCustomize } = require('../../../utils/functions/functions');


exports.add = async (req, res) => {
    let { buildingName, ownerName, ownerNumber } = req.body;
    const percentage = parseInt(process.env.PERCENTAGE_1);
    const listingBy = req.user.id;
    try {
        /* CUSTOMIZE_PHONE_NO */
        ownerNumber ? ownerNumber = phnCustomize(ownerNumber):null;

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE_PROPERTY */
        const property = await Property.create({ buildingName, ownerName, ownerNumber, percentage, listingBy });
        if (!property) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ property });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {

    let { buildingName, ownerName, ownerNumber } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* CUSTOMIZE_PHONE_NO */
        ownerNumber ? ownerNumber = phnCustomize(ownerNumber):null;

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* UPDATE */
        const property = await Property.update({ buildingName, ownerName, ownerNumber }, condition);
        if (!property) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.softDelete = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* FIND_&_SOFT_DELETE */
        const property = await Property.findOne(condition);
        const softDelete = await property.update({ softDelete: true });
        if (!softDelete) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.delete });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.hardDelete = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const property = await Property.destroy(condition);
        if (property === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (property === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const query = {
        where: {
            [Op.and]: [
                { id: id },
                { softDelete: false }
            ]
        },
        include: [
            { model: ContactInfo },
            {
                model: BuildingInfo,
                include: [
                    { model: LiftAC },
                    { model: Parking },
                    { model: Facilities },
                ]
            },
            {
                model: UnitInfo,
                include: [
                    { model: LiftAC },
                    { model: Parking },
                    { model: Equipment },
                    { model: Furnised },
                ]
            },
            { model: Address },
            { model: User ,attributes:['userName']},
        ]
    };

    try {
        const property = await Property.findOne(query);
        if (!property) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ property });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};
