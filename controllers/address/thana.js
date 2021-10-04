const { Op } = require("sequelize");
const Thana = require('../../models').Thana;
const District = require('../../models').District;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.post = async (req, res) => {
    let { thana, districtId } = req.body;
    let message, withErrors, createThana, thanas = [], alreadyCreated = [];

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const value = (error) => error.value;
        if (!errors.isEmpty()) { message = errors.formatWith(value).mapped() };
        message ? withErrors = Object.values(message) : withErrors = null;

        /* ARRAY_FILTER */
        if (withErrors) {
            thana = thana.filter(function (elements) {
                return !withErrors.includes(elements);
            });
        }

        for (i = 0; i < thana.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { thana: thana[i] },
                        { districtId: districtId }
                    ]
                }
            };

            /* EXISTING_THANA */
            const existingThana = await Thana.findOne(query);

            /* CREATE */
            if (!existingThana) {
                createThana = await Thana.create({ thana: thana[i], districtId });
                thanas.push(createThana);
            } else if (existingThana) {
                alreadyCreated.push(thana[i]);
            };
        };

        /* RESPONCE */
        if (thanas.length > 0) {
            return res.status(200).json({
                created: thanas,
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
    const { thana, districtId } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };
    const condition1 = {
        where: {
            [Op.and]: [
                { thana: thana },
                { districtId: districtId }
            ]
        }
    };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_THANA */
        const existingThana = await Thana.findOne(condition1);

        /* UPDATE */
        if (!existingThana) {
            const updateThana = await Thana.update({ thana, districtId }, condition2);
            if (updateThana[0] === 0) { return res.status(424).json({ message: _response.failed }) };
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
        const removeThana = await Thana.destroy(condition);

        if (removeThana === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (removeThana === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getThanas = async (req, res) => {
    const district = req.query.district;
    let where = [];
    district ? where.push({ district: { [Op.like]: '%' + district + '%' } }) : !district;
    const query = { include: [{ model: District, where: where, attributes: [] }] };

    try {
        /* FIND_&_RESPONCE */
        const thana = await Thana.findAll(query);
        if (thana.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ thana });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};