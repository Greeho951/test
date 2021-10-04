const Offer = require('../../../models').Offer;
const Offer_types = require('../../../models').Offer_types;

exports.create = async (req, res) => {
    let { offer_types_id, status } = req.body;
    const offer = await Offer.create({ offer_types_id, status });
    return res.status(200).json({ offer });
}

exports.get_offer = async (req, res) => {
    const offer = await Offer.findAll({  include: {
        model: Offer_types,
        required: true
      } });
    return res.status(200).json({ offer });
}