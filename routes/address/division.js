const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { post, update, remove, getDivisions } = require('../../controllers/address/division');
const {validDivision1, validDivision2 } = require('../../utils/validations/address');


router.get('/division',        authVerify, getDivisions);
router.delete('/division/:id', authVerify, hasAccess('can_remove_address'), remove);
router.post('/division',       authVerify, hasAccess('can_create_address'), validDivision1, post);
router.put('/division/:id',    authVerify, hasAccess('can_edit_address'),   validDivision2, update);


module.exports = router;