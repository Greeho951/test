const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { validCountry } = require('../../utils/validations/address');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { add, edit, remove, list } = require('../../controllers/address/country');


router.get('/country', list);
router.delete('/country/:id', authVerify, hasAccess('can_remove_address'), remove);
router.post('/country',       authVerify, hasAccess('can_create_address'), validCountry, add);
router.put('/country/:id',    authVerify, hasAccess('can_edit_address'),   validCountry, edit);


module.exports = router;