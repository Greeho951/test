const About = require('../../models').About;
const User = require('../../models').User;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {
    const { ourJourney, whyGreeho, ourMission, transparency, quality, accuracy } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        console.log(req.user.id);
        /* CREATE */
        const about = await About.create({ ourJourney, whyGreeho, ourMission, transparency, quality, accuracy, creatorId: req.user.id });
        if (!about) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ about });

    } catch (error) { console.log(error) };
};

exports.edit = async (req, res) => {
    const { ourJourney, whyGreeho, ourMission, transparency, quality, accuracy } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* UPDATE */
        const about = await About.update({ ourJourney, whyGreeho, ourMission, transparency, quality, accuracy, updatorId: req.user.id }, condition);
        if (!about) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ role: _response.update });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const about = await About.destroy(condition);
        if (about === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (about === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

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

        /* EXISTING_ABOUT */
        const about = await About.findOne(condition);

        /* UPDATE */
        if (!about.status === status) {
            const updateAbout = await about.update({ status });
            if (!updateAbout) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) };
};

exports.viewAuto = async (req, res) => {
    const condition = {
        where: { status: true },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['creatorId', 'updatorId'] },
    };

    try {
        const about = await About.findOne(condition);
        if (about) {
            return res.status(200).json({ about });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = {
        where: { id: id },
        include: [
            { model: User, as: 'aboutCreateBy', attributes: ['userName', 'phnNo'] },
            { model: User, as: 'aboutUpdateBy', attributes: ['userName', 'phnNo'] },
        ]
    };

    try {
        const about = await About.findOne(condition);
        if (about) {
            return res.status(200).json({ about });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }
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
            { model: User, as: 'aboutCreateBy', attributes: ['userName', 'phnNo'] },
            { model: User, as: 'aboutUpdateBy', attributes: ['userName', 'phnNo'] },
        ]
    };

    try {
        /* LIST_WITH_CREATOR_UPDATOR */
        const data = await About.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ pagination: list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};

