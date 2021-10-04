const router = require('express').Router();
const {post, update, remove, getDetails} = require('../../../controllers/properties/buildingInfo/securities');

router.post('/securities', post);
router.put('/securities/:id', update);
router.delete('/securities/:id', remove);
router.get('/securities/:id', getDetails);
 
module.exports = router;