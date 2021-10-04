const Role = require('../../models').Role;
const User = require('../../models').User;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const db = require('../../models/index');
const { getPagination, getPagingData } = require('../../utils/functions/functions');

exports.add = async (req, res) => {
    const { roleName, permission } = req.body;
    const condition = { where: { roleName: roleName } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_ROLE_NAME */
        const existingRoleName = await Role.findOne(condition);

        /* CREATE */
        if (!existingRoleName) {
            const role = await Role.create({ roleName, permission, creatorId: req.user.id });
            if (!role) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ role });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {
    const { roleName, permission } = req.body;
    const id = req.params.id;
    const condition1 = { where: { roleName: roleName } }
    const condition2 = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* EXISTING_ROLE_NAME */
        const existingRoleName = await Role.findOne(condition1);

        /* UPDATE */
        if (!existingRoleName || (existingRoleName && existingRoleName.id == id)) {
            const role = await Role.update({ roleName, permission, updatorId: req.user.id }, condition2);
            if (!role) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ role: _response.update });
        } else { return res.status(302).json({ message: _response.duplicateValue }) };

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const role = await Role.destroy(condition);
        if (role === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (role === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};

exports.getList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
        attributes: { exclude: ['creatorId', 'updatorId'] },
        include: [
            { model: User, as: 'createBy', attributes: ['userName', 'phnNo'] },
            { model: User, as: 'updateBy', attributes: ['userName', 'phnNo'] },
        ],
        where:{status:true}
    };

    try {
        /* LIST_WITH_CREATOR_UPDATOR */
        const data = await Role.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ pagination: list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [{ model: User, where: { approval: true }, attributes: ['phnNo'], through: { attributes: [] } }],
    };

    try {
        const role = await Role.findOne(condition);
        if (role) {
            return res.status(200).json({ role });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }
};

exports.addUserToGroup = async (req, res) => {
    const { roles } = req.body;
    const { id } = req.body;

    try {
        /* EXISTING */
        const user = await User.findOne({ where: { id: id } });

        if (user) {
            const addUserToGroud = await user.addRoles(roles);
            if (!addUserToGroud) { return res.status(404).json({ message: _response.alreadyAdded }) }
            return res.status(200).json({ addUserToGroud });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }
};

exports.removeUserToGroup = async (req, res) => {
    const { roles } = req.body;
    const { id } = req.body;

    try {
        /* REMOVE_USER_FROM_GROUP */
        const user = await User.findOne({ where: { id: id } });

        if (user) {
            const removeUserFromGroup = await user.removeRoles(roles);
            if (!removeUserFromGroup) { return res.status(404).json({ message: _response.alreadyRemoved }) };
            return res.status(200).json({ removeUserFromGroup });
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

        /* EXISTING_ROLE */
        const role = await Role.findOne(condition);

        /* UPDATE */
        if (!role.status === status) {
            const updateRole = await role.update({ status });
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) };
};