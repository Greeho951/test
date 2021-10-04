const router = require('express').Router();
const {add} = require('../../../controllers/properties/unitInfo/furnised');

router.post('/furnised', add);
// router.put('/equipment/:id', update);
// router.delete('/equipment/:id', remove);

module.exports = router;