const Furnised = require('../../../models').Furnised;
const UnitInfo = require('../../../models').UnitInfo;

exports.add = async (req, res) => {
    const {
        wood,
        closet,
        wallCabinet,
        bed,
        vanity,
        sofa,
        diningTable,
        chairs,
        coffeTable,
        unitId,
    } = req.body;
    const condition = { where: { id: unitId } };

    try {
        const createFurnised = await Furnised.create({
            wood,
            closet,
            wallCabinet,
            bed,
            vanity,
            sofa,
            diningTable,
            chairs,
            coffeTable
        });

        if (!createFurnised) { return res.status(200).json({ message: _response.failed }) };
        const unitInfo = UnitInfo.update({ interiorId: createFurnised.dataValues.id }, condition);
        if (!unitInfo) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ furnised: createFurnised });

    } catch (error) { console.log(error) };
};
