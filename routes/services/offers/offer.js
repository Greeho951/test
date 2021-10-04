const router = require('express').Router();
const {create,get_offer} = require('../../../controllers/services/offers/offer');


router.post('/offer', create);
router.get('/offer', get_offer);


module.exports = router;

