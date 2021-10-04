const router = require('express').Router();
const {post, update, remove, getDetails} = require('../../../controllers/properties/unitInfo/unitInfo');

router.post('/unit-info', post);
router.put('/unit-info/:id', update);
router.delete('/unit-info/:id', remove);
router.get('/unit-info/:id', getDetails);

module.exports = router;