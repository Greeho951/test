const Equipment = require('../../../models').Equipment;
const UnitInfo = require('../../../models').UnitInfo;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {
    const { fan, light, cctv, geyser, stove, unitId, } = req.body;
    const condition = { where: { id: unitId } };

    try {
        /* CREATE_EUIPMENT */
        const equiments = await Equipment.create({ fan, light, cctv, geyser, stove });
        if (!equiments) { return res.status(424).json({ message: _response.failed }) };
        const unitInfo = UnitInfo.update({ equipmentId: equiments.dataValues.id }, condition);
        if (!unitInfo) { return res.status(200).json({ message: _response.failed }) };

        return res.status(200).json({ equiments });

    } catch (error) { console.log(error) };
};

exports.update = async (req, res) => {

    const { fan, light, cctv, geyser, stove } = req.body;
    const id = req.params.id;
    const condition = { where: { id: id } };

    try {
        /* UPDATE */
        const equiments = await Equipment.update({ fan, light, cctv, geyser, stove }, condition);
        if (!equiments) { return res.status(424).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) };
};

exports.remove = async (req, res) => {

    const id = req.params.id;
    const condition = { where: { id: id } };

    try {

        /* DELETE */
        const equiment = await Equipment.destroy(condition);

        if (equiment === 1) {
            return res.status(200).json({ message: _response.delete });
        } else if (equiment === 0) {
            return res.status(404).json({ message: _response.emptyList });
        } else { return res.status(500).json({ message: _response.error }) };

    } catch (error) { console.log(error) };
};
