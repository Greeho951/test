const Contact = require('../../models').Contact;
const { validationResult } = require('express-validator');
const { _response } = require('../../utils/functions/response');
const { phnCustomize, getPagination, getPagingData } = require('../../utils/functions/functions');


exports.add = async (req, res) => {
    let { name, email, phnNo, message } = req.body;

    try {
        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CUSTOMIZE_PHONE_NO */
        phnNo = phnCustomize(phnNo);
        console.log(phnNo)
        if (phnNo === null) { return res.status(400).json({ message: _response.invalid }) }

        /* CREATE */
        const contact = await Contact.create({ name, email, phnNo, message });
        if (!contact) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ contact });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const contact = await Contact.destroy(condition);
        if (contact === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (contact === 0) {
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

        /* EXISTING_CONTACT */
        const contact = await Contact.findOne(condition);

        /* UPDATE */
        if (!contact.status === status) {
            const updateContact = await contact.update({ status });
            if (!updateContact) { return res.status(200).json({ message: _response.failed }) };
            return res.status(200).json({ message: _response.update });
        } else { return res.status(404).json({ message: _response.statusUpdated }) };

    } catch (error) { console.log(error) };
};

exports.getList = async (req, res) => {
    let { page, size } = req.query;
    if (page === undefined) { page = 1 };
    const { limit, offset } = getPagination(page, size);

    const query = {
        limit: limit,
        offset: offset,
    };

    try {
        /* LIST */
        const data = await Contact.findAndCountAll(query);
        const list = getPagingData(data, page, limit);

        if (list.records.length !== 0) {
            return res.status(200).json({ pagination: list });
        } else { return res.status(404).json({ message: _response.emptyList }) };

    } catch (error) { console.log(error) }

};



