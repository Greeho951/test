const Facilities = require('../../../models').Facilities;
const BuildingInfo = require('../../../models').BuildingInfo;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {
    let {
        survailanceCamera,
        solarPannel,
        sharedGym,
        sharedPool,
        playGround,
        communityHall,
        rofftopGarden,
        greenApartment,
        fireSafty,
        emergencyStairs,
        driverLounge,
        security,
        reception,
        buildingId
    } = req.body;
    // const condition = { where: { id: buildingId } };

    try {
        /* CREATE_FACILITIES */
        const facilities = await Facilities.create({
            survailanceCamera,
            solarPannel,
            sharedGym,
            sharedPool,
            playGround,
            communityHall,
            rofftopGarden,
            greenApartment,
            fireSafty,
            emergencyStairs,
            driverLounge,
            security,
            reception,
            buildingId
        });
        if (!facilities) { return res.status(200).json({ message: _response.failed }) };
        // const buildingInfo = await BuildingInfo.findOne(condition);
        // const updatePercentage = property.dataValues.percentage + parseInt(process.env.PERCENTAGE_1);
        // const propertyUpdate = await property.update({ contactId: contactInfo.dataValues.id, percentage: updatePercentage });
        // if (!contactInfo || !propertyUpdate) { return res.status(200).json({ message: _response.failed }) };

        return res.status(200).json({ facilities });

    } catch (error) { console.log(error) }
}

exports.update = async (req, res) => {

    let {
        survailanceCamera,
        solarPannel,
        sharedGym,
        sharedPool,
        playGround,
        communityHall,
        rofftopGarden,
        greenApartment,
        fireSafty,
        emergencyStairs,
        driverLounge,
        security,
        reception
    } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* UPDATE */
        const facilities = await Facilities.update({
            survailanceCamera,
            solarPannel,
            sharedGym,
            sharedPool,
            playGround,
            communityHall,
            rofftopGarden,
            greenApartment,
            fireSafty,
            emergencyStairs,
            driverLounge,
            security,
            reception
        }, { where: condition });
        if (!facilities) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE */
        const facilities = await Facilities.destroy({ where: condition });

        if (facilities === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (facilities === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.getDetails = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const facilities = await Facilities.findOne({ where: condition });
        if (facilities) {
            return res.status(200).json({ facilities });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
}
