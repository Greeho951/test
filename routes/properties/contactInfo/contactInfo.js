const router = require('express').Router();
const { add, edit, getDetails, remove } = require('../../../controllers/properties/contactInfo/contactInfo');
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { validContacts } = require('../../../utils/validations/properties');


router.get('/contacts/:id',    authVerify, getDetails);
router.post('/contacts',       authVerify, validContacts, add);
router.put('/contacts/:id',    authVerify, validContacts, edit);
router.delete('/contacts/:id', authVerify,hasAccess('can_delete_contacts'), remove);


module.exports = router;