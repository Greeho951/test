const Registration = require('../../../models').Registration;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {
    let { commercials, residentials, rajuk, unionCouncil } = req.body;

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* CREATE_FACILITIES */
        const registration = await Registration.create({ commercials, residentials, rajuk, unionCouncil });

        if (!registration) { return res.status(200).json({ message: _response.failed }) }
        return res.status(200).json({ registration });

    } catch (error) { console.log(error) }
}

exports.update = async (req, res) => {

    let { commercials, residentials, rajuk, unionCouncil } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* UPDATE */
        const registration = await Registration.update({ commercials, residentials, rajuk, unionCouncil }, { where: condition });
        if (!registration) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE */
        const registration = await Registration.destroy({ where: condition });

        if (registration === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (registration === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.getDetails = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const registration = await Registration.findOne({ where: condition });
        if (registration) {
            return res.status(200).json({ registration });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
}
