const { Op } = require("sequelize");
const User = require('../../../models').User;
const Service = require('../../../models').Service;
const Category = require('../../../models').Category;
const Complain = require('../../../models').Complain;
const { validationResult } = require('express-validator');
const SubCategory = require('../../../models').SubCategory;
const { _response } = require('../../../utils/functions/response');
const { getPagination, getPagingData } = require('../../../utils/functions/functions');

exports.add = async (req, res) => {
    const {
        categoryId,
        subCategoryId,
        headline,
        overview,
        safetyEnsured,
        expectation,
        notExpectation,
        quantity,
        price,
        availability
    } = req.body;
    const condition = { where: { headline: headline } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_SERVICE_TITLE */
        const existingService = await Service.findOne(condition);

        /* CREATE */
        if (!existingService) {

            const createService = await Service.create({
                categoryId,
                subCategoryId,
                headline,
                overview,
                safetyEnsured,
                expectation,
                notExpectation,
                quantity,
                price,
                availability,
                creatorId: req.user.id,
            });

            if (!createService) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ service: createService });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {
    const {
        categoryId,
        subCategoryId,
        headline,
        overview,
        safetyEnsured,
        expectation,
        notExpectation,
        quantity,
        price,
        availability
    } = req.body;
    const id = req.params.id;
    const condition1 = { where: { headline: headline } };
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_SERVICE_HEADLINE */
        const existingServiceHeadline = await Service.findOne(condition1);

        /* UPDATE */
        if (!existingServiceHeadline || (existingServiceHeadline && existingServiceHeadline.id == id)) {
            const service = await existingServiceHeadline.update({
                categoryId,
                subCategoryId,
                headline,
                overview,
                safetyEnsured,
                expectation,
                notExpectation,
                quantity,
                price,
                availability,
                updatorId: req.user.id,
            }, condition2);

            if (!service) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });

        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* FIND_&_DELETE */
        const service = await Service.destroy(condition);

        if (service === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (service === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getActiveList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { status: true },
        include: [
            { model: Category, attributes: ['id', 'categoryName'] },
            { model: SubCategory, attributes: ['id', 'title'] },
        ]
    };

    try {
        /* ACTIVE_LIST */
        const data = await Service.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};

exports.getInActiveList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { status: false },
        include: [
            { model: Category, attributes: ['id', 'categoryName'] },
            { model: SubCategory, attributes: ['id', 'title'] },
        ]
    };

    try {
        /* ACTIVE_LIST */
        const data = await Service.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }

};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const query = {
        where: { id: id },
        include: [
            { model: Category, attributes: ['id', 'categoryName'] },
            { model: SubCategory, attributes: ['id', 'title'] },
            { model: Complain, attributes: ['id', 'complains'], include: [{ model: User, as: 'complainCreateBy' }] },
            // { model: User, as: 'complainCreateBy' },
            // { model: User, as: 'complainUpdateBy' },
            // { model: User, as: 'complainCreateBy' },
        ]
    };

    try {
        const service = await Service.findOne(query);
        if (service) {
            return res.status(200).json({ service });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }
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

        /* EXISTING_SERVICE */
        const service = await Service.findOne(condition);

        /* UPDATE */
        if (!service.status === status) {
            const updateService = await service.update({ status });
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) }
};

exports.latest = async (req, res) => {

    const query = {
        limit: 5,
        where: { status: true },
        include: [
            { model: Category, attributes: ['id', 'categoryName'] },
            { model: SubCategory, attributes: ['id', 'title'] },
        ],
        order: [['createdAt', 'DESC']],
    };

    try {
        /* LATEST_5_SERVICE */
        const service = await Service.findAll(query);
        if (service) {
            return res.status(200).json({ service });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};
