const { Op } = require("sequelize");
const HowToOrder = require('../../models').HowToOrder;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');

exports.add = async (req, res) => {
    const { title, steps } = req.body;
    const query = { where: { title: title } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_HOW_TO_ORDER_TITLE */
        const existingTitle = await HowToOrder.findOne(query);

        /* CREATE */
        if (!existingTitle) {
            const createHowToOrder = await HowToOrder.create({ title, steps, creatorId: req.user.id });
            if (!createHowToOrder) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ howToOrder: createHowToOrder });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    const { title, steps } = req.body;
    const condition1 = { where: { title: title } };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_HOW_TO_ORDER_TITLE */
        const existingTitle = await HowToOrder.findOne(condition1);

        /* UPDATE */
        if (!existingTitle) {
            const howToOrder = await HowToOrder.update({ title, steps, updatorId: req.user.id }, condition2);
            if (!howToOrder) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const howToOrder = await HowToOrder.destroy(condition);

        if (howToOrder === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (howToOrder === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        const howToOrder = await HowToOrder.findOne(condition);

        if (howToOrder) {
            return res.status(200).json({ howToOrder });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};

exports.getActiveList = async (req, res) => {
    const { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    try {
        const data = await HowToOrder.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { status: true },
        });

        const list = getPagingData(data, page, limit);
        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) };
};

exports.getInActiveList = async (req, res) => {
    const { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    try {
        const data = await HowToOrder.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { status: false },
        });

        const list = getPagingData(data, page, limit);
        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

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

        /* EXISTING_HOW_TO_ORDER */
        const howToOrder = await HowToOrder.findOne(condition);

        /* UPDATE */
        if (!howToOrder.status === status) {
            const updateHowToOrder = await howToOrder.update({ status });
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) };
};
