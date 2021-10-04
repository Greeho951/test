const Securities = require('../../../models').Securities;
const { _response } = require('../../../utils/functions/response');

exports.post = async (req, res) => {

    let { gurds, socialSecurity, fireSafty, communityGurd, surveillanceCammera } = req.body;

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* CREATE_FACILITIES */
        const securities = await Securities.create({ gurds, socialSecurity, fireSafty, communityGurd, surveillanceCammera });

        if (!securities) { return res.status(200).json({ message: _response.failed }) }
        return res.status(200).json({ securities });

    } catch (error) { console.log(error) }
}

exports.update = async (req, res) => {

    let { gurds, socialSecurity, fireSafty, communityGurd, surveillanceCammera } = req.body;
    let id = req.params.id;
    let condition = { id: id };

    try {
        /* NO_CONTENT */
        if (Object.keys(req.body).length === 0) { return res.status(400).json({ message: _response.empty }) }

        /* UPDATE */
        const securities = await Securities.update({ gurds, socialSecurity, fireSafty, communityGurd, surveillanceCammera }, { where: condition });
        if (!securities) { return res.status(200).json({ message: _response.failed }) };
        return res.status(200).json({ message: _response.update });

    } catch (error) { console.log(error) }
}

exports.remove = async (req, res) => {

    let id = req.params.id;
    const condition = { id: id };

    try {

        /* DELETE */
        const securities = await Securities.destroy({ where: condition });

        if (securities === 1) {
            return res.status(200).json({ message: _response.delete })
        } else if (securities === 0) {
            return res.status(404).json({ message: _response.emptyList })
        } else { return res.status(500).json({ message: _response.error }) }

    } catch (error) { console.log(error) }
}

exports.getDetails = async (req, res) => {

    let id = req.params.id;
    let condition = { id: id };

    try {
        const securities = await Securities.findOne({ where: condition });
        if (securities) {
            return res.status(200).json({ securities });
        } else { return res.status(404).json({ message: _response.emptyList }); }

    } catch (error) { console.log(error) }
}
