const router = require('express').Router();
const {post, update, remove, getDetails} = require('../../../controllers/properties/buildingInfo/facilities');

router.post('/facilities', post);
router.put('/facilities/:id', update);
router.delete('/facilities/:id', remove);
router.get('/facilities/:id', getDetails);
 
module.exports = router;