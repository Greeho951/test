const Property = require('../../../models').Property;
const BuildingInfo = require('../../../models').BuildingInfo;
const { _response } = require('../../../utils/functions/response');

exports.add = async (req, res) => {
    const input = req.body;
    const condition = {
        where: { id: input.propertyId },
        include: [{ model: BuildingInfo }]
    };

    try {
        const property = await Property.findOne(condition);

        if (!property.BuildingInfo) {
            /* CREATE */
            const buildingInfo = await BuildingInfo.create(input);
            if (!buildingInfo) { return res.status(424).json({ message: _response.failed }) };

            /* PROPERTY_UPDATE */
            const property = await Property.findOne(condition);
            const updatePercentage = property.percentage + parseInt(process.env.PERCENTAGE_1);
            const propertyUpdate = await property.update({ propertyId: buildingInfo.id, percentage: updatePercentage });

            /* BUILDING_DELETE_IF_PROPERTY_NOT_UPDATED */
            if (!propertyUpdate && buildingInfo) {
                const condition2 = { where: { id: buildingInfo.id } };
                const contactInfo = await BuildingInfo.destroy(condition2);
                return res.status(424).json({ message: _response.failed });
            };
            return res.status(200).json({ buildingInfo });
        } else { return res.status(406).json({ message: _response.alreadyCreated }) };

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};

exports.edit = async (req, res) => {
    const input = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* UPDATE */
        const buildingInfo = await BuildingInfo.update(input, condition);
        if (!buildingInfo) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

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
        const buildingInfo = await BuildingInfo.destroy(condition);
        if (buildingInfo === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (buildingInfo === 0) {
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
        const buildingInfo = await BuildingInfo.findOne(condition);
        if (!buildingInfo) { return res.status(404).json({ message: _response.emptyList }) };
        return res.status(200).json({ buildingInfo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: _response.internalError });
    };
};
