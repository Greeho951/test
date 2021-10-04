const { Op } = require("sequelize");
const Area = require('../../models').Area;
const Thana = require('../../models').Thana;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.post = async (req, res) => {
    let { area, thanaId } = req.body;
    let message, withErrors, createArea, areas = [], alreadyCreated = [];

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const value = (error) => error.value;
        if (!errors.isEmpty()) { message = errors.formatWith(value).mapped() };
        message ? withErrors = Object.values(message) : withErrors = null;

        /* ARRAY_FILTER */
        if (withErrors) {
            area = area.filter(function (elements) {
                return !withErrors.includes(elements);
            });
        }


        for (i = 0; i < area.length; i++) {

            const query = {
                where: {
                    [Op.and]: [
                        { area: area[i] },
                        { thanaId: thanaId }
                    ]
                }
            };

            /* EXISTING_AREA*/
            const existingArea = await Area.findOne(query);

            /* CREATE */
            if (!existingArea) {
                createArea = await Area.create({ area: area[i], thanaId });
                areas.push(createArea);
            } else if (existingArea) {
                alreadyCreated.push(area[i]);
            };

        };

        /* RESPONCE */
        if (areas.length > 0) {
            return res.status(200).json({
                created: areas,
                notCreated: withErrors,
                alreadyTaken: alreadyCreated,
            });
        } else {
            return res.status(406).json({
                notCreated: withErrors,
                alreadyTaken: alreadyCreated,
            });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.update = async (req, res) => {
    const { area, thanaId } = req.body;
    const id = req.params.id;
    const condition1 = {
        where: {
            [Op.and]: [
                { area: area },
                { thanaId: thanaId }
            ]
        }
    };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_AREA*/
        const existingArea = await Area.findOne(condition1);

        /* UPDATE */
        if (!existingArea) {
            const updateArea = await Area.update({ area, thanaId }, condition2);
            if (updateArea[0] === 0) { return res.status(200).json({ message: _response.failed }) };
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
        const removeArea = await Area.destroy(condition);

        /* RESPONCE */
        if (removeArea === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (removeArea === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getAreas = async (req, res) => {
    const thana = req.query.thana;
    let where = [];
    thana ? where.push({ thana: { [Op.like]: '%' + thana + '%' } }) : !thana;
    const query = { include: [{ model: Thana, where: where, attributes: [] }] };

    try {
        /* FIND_&_RESPONCE */
        const area = await Area.findAll(query);
        if (area.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ area });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};