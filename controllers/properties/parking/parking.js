const Parking = require('../../../models').Parking;
const { validationResult } = require('express-validator');
const { _response } = require('../../../utils/functions/response');


exports.add = async (req, res) => {

    const { type, size, capacity, parkingId, parkingType} = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE */
        const parking = await Parking.create({ type, size, capacity, parkingId, parkingType});
        if (!parking) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ parking });

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {

    const id = req.params.id;
    let { type, size, capacity, parkingId, parkingType } = req.body;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE */
        const parking = await Parking.update({ type, size, capacity, parkingId, parkingType }, condition);
        if (!parking) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ parking });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const parking = await Parking.destroy(condition);
        if (parking === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (parking === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VIEW */
        const parking = await Parking.findOne(condition);
        if (parking) {
            return res.status(200).json({ parking });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};
