const Property = require('../../../models').Property;
const { validationResult } = require('express-validator');
const ContactInfo = require('../../../models').ContactInfo;
const { _response } = require('../../../utils/functions/response');
const { phnCustomize } = require('../../../utils/functions/functions');


exports.add = async (req, res) => {
    let { contactName, contactNumber, contactDesignation, propertyId } = req.body;
    const condition1 = {
        where: { id: propertyId },
        include: [{ model: ContactInfo }],
    };

    try {
        /* CUSTOMIZE_PHONE_NO */
        contactNumber = phnCustomize(contactNumber);

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* CONTACT_CREATE */
        const contactInfo = await ContactInfo.create({ contactName, contactNumber, contactDesignation, propertyId });
        if (!contactInfo) { return res.status(424).json({ message: _response.failed }) };

        /* PROPERTY_UPDATED */
        let property = await Property.findOne(condition1);
        if (property.ContactInfos.length === 1) {
            const updatePercentage = property.percentage + parseInt(process.env.PERCENTAGE_1);
            property = await property.update({ percentage: updatePercentage });
        };

        /* CONTACT_DELETE_IF_PROPERTY_NOT_UPDATED */
        if (!property && contactInfo) {
            const condition2 = { where: { id: contactInfo.id } }
            const contactInfo = await ContactInfo.destroy(condition2);
            return res.status(424).json({ message: _response.failed });
        };

        /* RESPONCE */
        return res.status(200).json({
            contactInfo,
            property
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    let { contactName, contactNumber, contactDesignation } = req.body;
    const condition = { where: { id: id } };

    try {
        /* CUSTOMIZE_PHONE_NO */
        contactNumber = phnCustomize(contactNumber);

        /* VALIDATION */
        let errors = validationResult(req);
        const formatter = (error) => error.msg;
        if (!errors.isEmpty()) { return res.status(400).send({ message: errors.formatWith(formatter).mapped() }) };

        /* UPDATE */
        const contactInfo = await ContactInfo.update({ contactName, contactNumber, contactDesignation }, condition);
        if (!contactInfo) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ contactInfo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.remove = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* DELETE */
        const contactInfo = await ContactInfo.destroy(condition);
        if (contactInfo === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (contactInfo === 0) {
            return res.status(404).json({ message: _response.emptyList });
        };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.getDetails = async (req, res) => {
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* FIND_&_VIEW */
        const contactInfo = await ContactInfo.findOne(condition);
        if (!contactInfo) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ contactInfo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};
