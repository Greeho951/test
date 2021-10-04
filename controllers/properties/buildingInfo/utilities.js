const Utilities = require('../../../models').Utilities;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {
    let { electricity, water, generator,status,emergencyStreais ,lift} = req.body;

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* CREATE_FACILITIES */
        const utilities = await Utilities.create({ electricity, water, generator,status,emergencyStreais ,lift});

        if (!utilities) { return res.status(200).json({ message: _response.failed }) }
        return res.status(200).json({ utilities });

    } catch (error) { console.log(error) }
}

exports.update = async (req, res) => {

    let { electricity, water, generator,status,emergencyStreais ,lift } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* UPDATE */
        const utilities = await Utilities.update({ electricity, water, generator,status,emergencyStreais ,lift }, { where: condition });
        if (!utilities) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE */
        const utilities = await Utilities.destroy({ where: condition });

        if (utilities === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (utilities === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.getDetails = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const utilities = await Utilities.findOne({ where: condition });
        if (utilities) {
            return res.status(200).json({ utilities });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
}
