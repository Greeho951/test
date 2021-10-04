const router = require('express').Router();
const {add} = require('../../../controllers/properties/badge/badge');

router.post('/badge', add);

module.exports = router;