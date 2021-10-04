const { Op } = require("sequelize");
const Country = require('../../models').Country;
const Division = require('../../models').Division;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');


exports.post = async (req, res) => {
    let { countryId, division } = req.body;
    let message, withErrors, createDivision, divisions = [], alreadyCreated = [];
    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const value = (error) => error.value;
        if (!errors.isEmpty()) { message = errors.formatWith(value).mapped() };
        message ? withErrors = Object.values(message) : withErrors = null;

        /* ARRAY_FILTER */
        if (withErrors) {
            division = division.filter(function (elements) {
                return !withErrors.includes(elements);
            });
        }

        for (i = 0; i < division.length; i++) {
            const condition = {
                where: {
                    [Op.and]: [
                        { division: division[i] },
                        { countryId: countryId }
                    ]
                }
            };

            /* EXISTING_DIVISION*/
            const existingDivision = await Division.findOne(condition);

            /* CREATE */
            if (!existingDivision) {
                createDivision = await Division.create({ division: division[i], countryId });
                divisions.push(createDivision);
            } else if (existingDivision) {
                alreadyCreated.push(division[i]);
            }
        };

        /* RESPONCE */
        if (divisions.length > 0) {
            return res.status(200).json({
                created: divisions,
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
    const { division, countryId } = req.body;
    const id = req.params.id;
    const condition1 = {
        where: {
            [Op.and]: [
                { division: division },
                { countryId: countryId }
            ]
        }
    };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_DIVISION */
        const existingDivision = await Division.findOne(condition1);

        /* UPDATE */
        if (!existingDivision) {
            const updateDivision = await Division.update({ division, countryId }, condition2);
            if (updateDivision[0] === 0) { return res.status(424).json({ message: _response.failed }) };
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
        const removeDivision = await Division.destroy(condition);

        /* RESPONCE */
        if (removeDivision === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (removeDivision === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDivisions = async (req, res) => {
    const country = req.query.country;
    let where = [];
    country ? where.push({ country: { [Op.like]: '%' + country + '%' } }) : !country;
    const query = { include: [{ model: Country, where: where, attributes: [] }] };

    try {
        /* FIND_&_RESPONCE */
        const division = await Division.findAll(query);
        if (division.length === 0) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ division });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};
