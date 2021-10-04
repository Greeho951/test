const Offer_types = require('../../../models').Offer_types;
const { validationResult } = require('express-validator');
const { _response } = require('../../../utils/functions/response');
const { getPagination, getPagingData } = require('../../../utils/functions/functions');

exports.post = async (req, res) => {
    let { offer_title, description, status } = req.body;

    try {
        /* NO CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.no_content }) }

        /* CHECK VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* CATEGORY TYPES */
        const existing_offer_title = await Offer_types.findAll({ where: { offer_title: offer_title } })

        if (existing_offer_title.length === 0) {
            const offer_types = await Offer_types.create({ offer_title, description, status });
            return res.status(200).json({ offer_types });
        } else { return res.status(302).json({ message: _response.existing_title }) }

    } catch (error) { console.log(error) }
}

exports.get_list = async (req, res) => {

    let { page, size } = req.query;
    if (page === undefined) { page = 1 }
    const { limit, offset } = getPagination(page, size);

    try {
        /* FETCH LIST */
        const data = await Offer_types.findAndCountAll({
            limit: limit,
            offset: offset,
            // attributes: ['id', 'title', 'status']
        });

        const list = getPagingData(data, page, limit);
        if (list.length !== 0) {
            return res.status(200).json({ list });
        } else { return res.status(404).json({ message: _response.empty }); }

    } catch (error) { console.log(error) }

}

exports.update = async (req, res) => {

    let { offer_title, description, status } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.no_content }) }

        /* CHECK VALIDATION */
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) }

        /* UPDATE QUERY */
        const offer_types = await Offer_types.update({ offer_title, description, status }, { where: condition })
        console.log(!offer_types);
        if (offer_types) {
            return res.status(200).json({ message: _response.update })
        } else { return res.status(404).json({ message: _response.empty }) }

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE CATEGORY TYPES */
        const offer_types = await Offer_types.destroy({ where: condition });

        if (offer_types === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (offer_types === 0) {
            return res.status(404).json({ message: _response.empty })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.get_details = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const offer_types = await Offer_types.findOne({ where: condition })
        if (offer_types) {
            return res.status(200).json({ offer_types });
        } else { return res.status(404).json({ message: _response.empty }); }

    } catch (error) { console.log(error) }
}

exports.status_change = async (req, res) => {

    let { status } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.no_content }) }

        /* UPDATE */
        const offer_types = await Offer_types.update({ status }, { where: condition })
        if (offer_types) {
            return res.status(200).json({ message: _response.update })
        } else { return res.status(404).json({ message: _response.no_user }) }

    } catch (error) { console.log(error) }
}