const { Op } = require("sequelize");
const Property = require('../../models').Property;
const Address = require('../../models').Address;
const Country = require('../../models').Country;
const Division = require('../../models').Division;
const District = require('../../models').District;
const Thana = require('../../models').Thana;
const Area = require('../../models').Area;
const Village = require('../../models').Village;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.post = async (req, res) => {
    let {
        country,
        division,
        district,
        thana,
        area,
        block,
        section,
        sector,
        roadNo,
        houseNo,
        propertyId
    } = req.body;

    let village = [];
    block ? block = `block:${block}` : null;
    section ? section = `section:${section}` : null;
    sector ? sector = `sector:${sector}` : null;
    village.push(block);
    village.push(section);
    village.push(sector);
    console.log(block,section,sector);

    const condition = { where: { id: propertyId } };
    let createAddress;

    const query = {
        where: {
            [Op.and]: [
                { country: country },
                { division: division },
                { district: district },
                { thana: thana },
                {
                    village: {
                        [Op.in]:village,
                        //  [{block}, {section}, {sector}] //<- array of featuresIds
                      } 
                },
                { area: area },
                { roadNo: roadNo },
                { houseNo: houseNo },
            ]
        }
    };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_ADDRESS */
        const existingAddress = await Address.findOne(query);
        console.log(existingAddress);

        /* CREATE_ADDRESS */
        if (!existingAddress) {
            createAddress = await Address.create({
                country,
                division,
                district,
                thana,
                area,
                village,
                roadNo,
                houseNo,
                propertyId
            });

        } else if (existingAddress) {
            createAddress = existingAddress;
            // return res.status(302).json({ address: existingAddress }) 
        };
        const property = await Property.findOne(condition);
        const updatePercentage = property.dataValues.percentage + parseInt(process.env.PERCENTAGE_1);
        const propertyUpdate = await property.update({ addressId: createAddress.dataValues.id, percentage: updatePercentage });

        if (!createAddress || !propertyUpdate) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({
            address: createAddress,
            propertyUpdate,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.update = async (req, res) => {
    const {
        country,
        division,
        district,
        thana,
        area,
        village,
        roadNo,
        houseNo
    } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* UPDATE */
        const address = await Address.update({
            country,
            division,
            district,
            thana,
            area,
            village,
            roadNo,
            houseNo
        }, condition);
        if (!address) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const address = await Address.destroy(condition);

        if (address === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (address === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getAddress = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } }

    try {
        const address = await Address.findOne(condition);
        if (address) {
            return res.status(200).json({ address });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};