const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { validAbout, validStatus } = require('../../utils/validations/validations');
const {
    add,
    edit,
    remove,
    getList,
    viewAuto,
    getDetails,
    statusChange,
} = require('../../controllers/About/about');


router.get('/about', viewAuto);
router.post('/about',           authVerify, hasAccess('can_create_about'), validAbout, add);
router.put('/about/:id',        authVerify, hasAccess('can_edit_about'),   validAbout,  edit);
router.put('/about-status/:id', authVerify, hasAccess('can_edit_about'),   validStatus, statusChange);
router.delete('/about/:id',     authVerify, hasAccess('can_remove_about'), remove);
router.get('/about/:id',        authVerify, hasAccess('can_get_about'),    getDetails);
router.get('/about-list',       authVerify, hasAccess('can_get_about'),    getList);


module.exports = router;

