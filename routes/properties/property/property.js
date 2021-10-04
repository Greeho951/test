const router = require('express').Router();
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { validProperty } = require('../../../utils/validations/properties');
const { add, edit, softDelete, hardDelete, getDetails } = require('../../../controllers/properties/property/property');


router.delete('/property/:id',        authVerify, softDelete);
router.get('/property/:id',           authVerify, getDetails);
router.post('/property',              authVerify, validProperty, add);
router.put('/property/:id',           authVerify, validProperty, edit);
router.delete('/property-delete/:id', authVerify, hasAccess('can_delete_property'), hardDelete);


module.exports = router;