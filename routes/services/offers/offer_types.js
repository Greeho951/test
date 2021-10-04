const router = require('express').Router();
const {post, get_list, update, remove, get_details, status_change} = require('../../../controllers/services/offers/offer_types');

/* USER API */
router.post('/offer-types', post);
router.get('/offer-types', get_list);
router.get('/offer-types/:id', get_details);
router.put('/offer-types/:id', update);
router.put('/offer-types-status/:id', status_change);
router.delete('/offer-types/:id', remove);


module.exports = router;

