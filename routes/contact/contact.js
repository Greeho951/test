const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { validContact, validStatus } = require('../../utils/validations/validations');
const { add, remove, getList, statusChange } = require('../../controllers/contact/contact');


router.post('/contact', validContact, add);
router.get('/contact', authVerify, hasAccess('can_view_contact'), getList);
router.delete('/contact/:id', authVerify, hasAccess('can_remove_contact'), remove);
router.put('/contact/:id', authVerify, hasAccess('can_edit_contact'), validStatus, statusChange);


module.exports = router;

