const { Op } = require("sequelize");
const District = require('../../models').District;
const Division = require('../../models').Division;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.post = async (req, res) => {
    let { district, divisionId } = req.body;
    let message, withErrors, createDistrict, districts = [], alreadyCreated = [];

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const value = (error) => error.value;
        if (!errors.isEmpty()) { message = errors.formatWith(value).mapped() };
        message ? withErrors = Object.values(message) : withErrors = null;

        /* ARRAY_FILTER */
        if (withErrors) {
            district = district.filter(function (elements) {
                return !withErrors.includes(elements);
            });
        }

        for (i = 0; i < district.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { district: district[i] },
                        { divisionId: divisionId }
                    ]
                }
            };

            /* EXISTING_DISTRICT */
            const existingDistrict = await District.findOne(query);

            /* CREATE */
            if (!existingDistrict) {
                createDistrict = await District.create({ district: district[i], divisionId });
                districts.push(createDistrict);
            } else if (existingDistrict) {
                alreadyCreated.push(district[i]);
            };

        };

        /* RESPONCE */
        if (districts.length > 0) {
            return res.status(200).json({
                created: districts,
                notCreated: withErrors,
                alreadyTaken: alreadyCreated,
            });
        } else {
            return res.status(406).json({
                notCreated: withErrors,
                alreadyTaken: alreadyCreated,
            })
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.update = async (req, res) => {
    const { district, divisionId } = req.body;
    const id = req.params.id;
    const condition2 = { where: { id: id } };
    const condition1 = {
        where: {
            [Op.and]: [
                { district: district },
                { divisionId: divisionId }
            ]
        }
    };
    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_DISTRICT */
        const existingDistrict = await District.findOne(condition1);

        /* UPDATE */
        if (!existingDistrict) {
            const updateDistrict = await District.update({ district, divisionId }, condition2);
            if (updateDistrict[0] === 0) { return res.status(424).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(406).json({ message: _response.duplicateValue }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.remove = async (req, res) => {
    let id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const removeDistrict = await District.destroy(condition);
        if (removeDistrict === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (removeDistrict === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDistricts = async (req, res) => {
    const division = req.query.division;
    let where = [];
    division ? where.push({ division: { [Op.like]: '%' + division + '%' } }) : !division;
    const query = { include: [{ model: Division, where: where, attributes: [] }] };

    try {
        /* FIND_&_RESPONCE */
        const district = await District.findAll(query);
        if (district.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ district });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};