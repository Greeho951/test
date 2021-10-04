const Ratting = require('../../../models').Ratting;
const User = require('../../../models').User;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {
    let { ratting, rattingId,rattingType} = req.body;

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* CREATE_EUIPMENT */
        const createRatting = await Ratting.create({  ratting, userId:req.user.id, rattingId,rattingType });
        if (!createRatting) { return res.status(200).json({ message: _response.failed }) }
        return res.status(200).json({ ratting:createRatting });

    } catch (error) { console.log(error) }
}
