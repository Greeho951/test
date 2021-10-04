const { Op } = require("sequelize");
const Service = require('../../models').Service;
const Complain = require('../../models').Complain;
const Property = require('../../models').Property;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {
    const { complains, productId, productType } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CREATE */
        const complain = await Complain.create({ complains, productId, productType, creatorId: req.user.id });
        if (!complain) { return res.status(200).json({ message: _response.failed }) }
        return res.status(200).json({ complain });

    } catch (error) { console.log(error) }
};

exports.edit = async (req, res) => {
    const { complains, productId, productType } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* UPDATE */
        const complain = await Complain.update({ complains, productId, productType, updatorId: req.user.id }, condition);
        if (!complain) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const complain = await Complain.destroy(condition);

        if (complain === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (complain === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const query = {
        where: { id: id },
        [Op.or]: [
            { include: [{ model: Property, required: true, attributes: [] }] },
            { include: [{ model: Service, required: true, attributes: [] }] }
        ]
    };


    try {
        const complain = await Complain.findOne(query);
        if (complain) {
            return res.status(200).json({ complain });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
};

exports.getActiveList = async (req, res) => {
    const { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Complain.findAndCountAll({
            where: { status: true },
            limit: limit,
            offset: offset,
        });

        const list = getPagingData(data, page, limit);
        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }

};

exports.getInActiveList = async (req, res) => {
    const { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    try {
        const data = await Complain.findAndCountAll({
            where: { status: false },
            limit: limit,
            offset: offset,
        });

        const list = getPagingData(data, page, limit);
        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }

};

exports.getPropertyComplains = async (req, res) => {
    const query = { include: [{ model: Property, required: true, attributes: [] }] };
    try {
        const complains = await Complain.findAll();
        // console.log(complains);
        if (complains) {
            return res.status(200).json({ complains });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
};

exports.getServiceComplains = async (req, res) => {
    const query = { include: [{ model: Service, required: true, attributes: [] }] }
    try {
        const complains = await Complain.findAll(query);
        if (complains) {
            return res.status(200).json({ complains });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) };
};

exports.statusChange = async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_COMPLAIN */
        const complain = await Complain.findOne(condition);

        /* UPDATE */
        if (!complain.status === status) {
            const updateComplain = await complain.update({ status });
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) }
};

