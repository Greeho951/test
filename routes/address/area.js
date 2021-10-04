const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const {validArea1, validArea2 } = require('../../utils/validations/address');
const { post, update, remove, getAreas } = require('../../controllers/address/area');


router.get('/area',        authVerify, getAreas);
router.delete('/area/:id', authVerify, hasAccess('can_remove_address'), remove);
router.post('/area',       authVerify, hasAccess('can_create_address'), validArea1, post);
router.put('/area/:id',    authVerify, hasAccess('can_edit_address'),   validArea2, update);


module.exports = router;