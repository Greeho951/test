const router = require('express').Router();
const { add, edit, getDetails, remove } = require('../../../controllers/properties/parking/parking');
const { validParking } = require('../../../utils/validations/properties');
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');


router.post('/parking',  validParking, add);
router.put('/parking/:id', authVerify, validParking, edit);
router.delete('/parking/:id', authVerify, remove);
router.get('/parking/:id', authVerify, getDetails);


module.exports = router;