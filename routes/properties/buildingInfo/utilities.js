const router = require('express').Router();
const {post, update, remove, getDetails} = require('../../../controllers/properties/buildingInfo/utilities');

router.post('/utilities', post);
router.put('/utilities/:id', update);
router.delete('/utilities/:id', remove);
router.get('/utilities/:id', getDetails);
 
module.exports = router;