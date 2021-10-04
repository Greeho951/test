const { Op } = require("sequelize");
const Country = require('../../models').Country;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.add = async (req, res) => {
    const { country } = req.body;
    const condition = { where: { country: country } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };
 
        /* EXISTING_COUNTRY */
        const existingCountry = await Country.findOne(condition);

        /* CREATE */
        if (!existingCountry) {
            const createCountry = await Country.create({ country });
            if (!createCountry) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({
                message: _response.success,
                country: createCountry
            });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const { country } = req.body;
    const id = req.params.id;
    const condition1 = { where: { country: country } };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_COUNTRY */
        const existingCountry = await Country.findOne(condition1);

        /* UPDATE */
        if (!existingCountry || existingCountry && existingCountry.id == id) {
            const updateCountry = await Country.update({ country }, condition2);
            if (updateCountry[0] === 0) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

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
        const deleteCountry = await Country.destroy(condition);

        /* RESPONCE */
        if (deleteCountry === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (deleteCountry === 0) { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.list = async (req, res) => {
    const country = req.query.country;
    const query = {
        attributes: ['country','id'],
        order: [['country', 'ASC']],
    };
    try {
        /* LIST */
        const countryList = await Country.findAll(query);
        if (countryList.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ list: countryList });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};