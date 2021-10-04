const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { validDistrict1, validDistrict2 } = require('../../utils/validations/address');
const { post, update, remove, getDistricts } = require('../../controllers/address/district');


router.get('/district',        authVerify, getDistricts);
router.delete('/district/:id', authVerify, hasAccess('can_remove_address'), remove);
router.post('/district',       authVerify, hasAccess('can_create_address'), validDistrict1, post);
router.put('/district/:id',    authVerify, hasAccess('can_edit_address'),   validDistrict2, update);


module.exports = router;