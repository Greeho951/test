const Category = require('../../../models').Category;
const { validationResult } = require('express-validator');
const SubCategory = require('../../../models').SubCategory;
const { _response } = require('../../../utils/functions/response');
const { getPagination, getPagingData } = require('../../../utils/functions/functions');


exports.add = async (req, res) => {
    const { categoryName } = req.body;
    const condition = { where: { categoryName: categoryName } };

    try {
        /* VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_CATEGORY_NAME */
        const existingCategoryName = await Category.findAll(condition);

        /* CREATE */
        if (existingCategoryName.length === 0) {
            const category = await Category.create({ categoryName });
            if (!category) { return res.status(200).json({ message: _response.failed }); }
            return res.status(200).json({ category });
        } else { return res.status(302).json({ message: _response.duplicateValue }) }

    } catch (error) { console.log(error) }
};

exports.edit = async (req, res) => {
    const { categoryName } = req.body;
    const id = req.params.id;
    const condition1 = { where: { categoryName: categoryName } };
    const condition2 = { where: { id: id } };

    try {
        /* CHECK_VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* EXISTING_CATEGORY_TITLE */
        const existingCategoryTitle = await Category.findOne(condition1);

        /* UPDATE */
        if (!existingCategoryTitle || (existingCategoryTitle && existingCategoryTitle.id == id)) {
            const category = await Category.update({ categoryName }, condition2);
            if (!category) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ category: _response.update });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) }
};

exports.getActiveList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { status: true }
    };

    try {
        /* LIST */
        const data = await Category.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ pagination: list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};

exports.getInActiveList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        where: { status: false }
    };

    try {
        /* LIST */
        const data = await Category.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ pagination: list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

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

        /* EXISTING_CATEGORY */
        const category = await Category.findOne(condition);

        /* UPDATE */
        if (!category.status === status) {
            const updateCategory = await category.update({ status });
            if (!updateCategory) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) }
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const category = await Category.destroy(condition);

        if (category === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (category === 0) {
            return res.status(404).json({ message: _response.empty })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [{ model: SubCategory }],
    };

    try {
        const category = await Category.findOne(condition)
        if (category) {
            return res.status(200).json({ category });
        } else { return res.status(404).json({ message: _response.empty }); }

    } catch (error) { console.log(error) }
};


