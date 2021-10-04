const { validationResult } = require('express-validator');
const SubCategory = require('../../../models').SubCategory;
const { _response } = require('../../../utils/functions/response');
const { getPagination, getPagingData } = require('../../../utils/functions/functions');


exports.add = async (req, res) => {
    const { title, categoryId } = req.body;
    const condition = { where: { title: title } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_TITLE */
        const existingTitle = await SubCategory.findAll(condition);

        /* CREATE */
        if (existingTitle.length === 0) {
            const subCategory = await SubCategory.create({ title, categoryId });
            if (!subCategory) { return res.status(200).json({ message: _response.failed }) }
            return res.status(200).json({ subCategory });
        } else { return res.status(302).json({ message: _response.duplicateValue }) }

    } catch (error) { console.log(error) }
};

exports.edit = async (req, res) => {
    const { title, categoryId } = req.body;
    const id = req.params.id;
    const condition1 = { where: { title: title } };
    const condition2 = { where: { id: id } };

    try {
        /* CHECK_VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_SUB_CATEGORY_TITLE */
        const existingSubCategoryTitle = await SubCategory.findOne(condition1);

        /* UPDATE */
        if (!existingSubCategoryTitle || (existingSubCategoryTitle && existingSubCategoryTitle.id == id)) {
            const subCategory = await SubCategory.update({ title, categoryId }, condition2);
            if (!subCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ subCategory: _response.update });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE_SUB_CATEGORY */
        const subCategory = await SubCategory.destroy(condition);

        if (subCategory === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (subCategory === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
};

exports.getActiveList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { status: true },
        attributes: ['id', 'title', 'status']
    };

    try {
        /* ACTIVE_LIST */
        const data = await SubCategory.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }); }

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
        attributes: ['id', 'title', 'status']
    };

    try {
        /* IN_ACTIVE_LIST */
        const data = await SubCategory.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }

};

exports.statusChange = async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_SUB_CATEGORY */
        const subCategory = await SubCategory.findOne(condition);

        /* UPDATE */
        if (!subCategory.status === status) {
            const updateSubCategory = await subCategory.update({ status });
            if (!updateSubCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) }
};