const LiftAC = require('../../../models').LiftAC;
const BuildingInfo = require('../../../models').BuildingInfo;
const UnitInfo = require('../../../models').UnitInfo;
var moment = require('moment');
const { validationResult } = require('express-validator');
const { _response } = require('../../../utils/functions/response');


exports.add = async (req, res) => {

    let { refId, total, brand, capacity, lastService, nextService, productType } = req.body;
    // lastService = moment(lastService).format('MMMM DD YYYY');
    // nextService = moment(nextService).format('DD/MM/YYYY');

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE */
        const liftAC = await LiftAC.create({ refId, total, brand, capacity, lastService, nextService, productType });
        if (!liftAC) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ liftAC });

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {

    const id = req.params.id;
    let { total, brand, capacity, lastService, nextService } = req.body;
    lastService = moment(lastService).format('MMMM DD YYYY');
    nextService = moment(nextService).format('DD/MM/YYYY');
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE */
        const liftAC = await LiftAC.update({ total, brand, capacity, lastService, nextService }, condition);
        if (!liftAC) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ liftAC });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const liftAC = await LiftAC.destroy(condition);
        if (liftAC === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (liftAC === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VIEW */
        const liftAC = await LiftAC.findOne(condition);
        if (liftAC) {
            return res.status(200).json({ liftAC });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};


exports.getBuildingLift = async (req, res) => {
    const query = { include: [BuildingInfo] };

    try {
        const equipment = await LiftAC.findAll(query);
        if (!equipment) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ equipment });

    } catch (error) { console.log(error) };
};