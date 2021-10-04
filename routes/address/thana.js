const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { validThana1, validThana2 } = require('../../utils/validations/address');
const { post, update, remove, getThanas } = require('../../controllers/address/thana');


router.get('/thana',        authVerify, getThanas);
router.delete('/thana/:id', authVerify, hasAccess('can_remove_address'), remove);
router.post('/thana',       authVerify, hasAccess('can_create_address'), validThana1, post);
router.put('/thana/:id',    authVerify, hasAccess('can_edit_address'),   validThana2, update);


module.exports = router;