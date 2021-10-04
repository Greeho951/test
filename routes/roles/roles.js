const {
    add, 
    edit, 
    remove, 
    getList, 
    getDetails, 
    statusChange,
    addUserToGroup, 
    removeUserToGroup, 
} = require('../../controllers/roles/roles');
const router = require('express').Router();
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { validRole, validStatus } = require('../../utils/validations/validations');


router.post('/role',           authVerify, hasAccess('can_create_role'), validRole,   add);
router.put('/role/:id',        authVerify, hasAccess('can_edit_role'),   validRole,   edit);
router.put('/role-status/:id', authVerify, hasAccess('can_edit_role'),   validStatus, statusChange);
router.delete('/role/:id',     authVerify, hasAccess('can_remove_role'),              remove);
router.get('/role',            authVerify, hasAccess('can_view_role'),                getList);
router.get('/role/:id',        authVerify, hasAccess('can_view_role'),                getDetails);
router.post('/role-assign',    authVerify, hasAccess('can_add_user_in_role'),         addUserToGroup);
router.delete('/role-remove',  authVerify, hasAccess('can_remove_user_from_role'),    removeUserToGroup);


module.exports = router;

