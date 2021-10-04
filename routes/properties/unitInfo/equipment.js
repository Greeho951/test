const router = require('express').Router();
const {post, update, remove} = require('../../../controllers/properties/unitInfo/equipment');

router.post('/equipment', post);
router.put('/equipment/:id', update);
router.delete('/equipment/:id', remove);

module.exports = router;