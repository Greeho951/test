const router = require('express').Router();
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { validService, validStatus } = require('../../../utils/validations/services');
const { 
    add, 
    edit, 
    latest,
    remove, 
    getDetails, 
    statusChange,
    getActiveList, 
    getInActiveList, 
} = require('../../../controllers/services/services/service');
// best, top, 


router.get('/latest-service', latest);
router.get('/service/:id',    getDetails);
router.get('/service',        getActiveList);
router.post('/service',                  authVerify, hasAccess('can_create_service'), validService, add);
router.put('/service/:id',               authVerify, hasAccess('can_edit_service'),   validService, edit);
router.put('/service-status-change/:id', authVerify, hasAccess('can_edit_service'),   validStatus,  statusChange);
router.delete('/service/:id',            authVerify, hasAccess('can_remove_service'),               remove);
router.get('/inactive-service',          authVerify, hasAccess('can_view_inactive_service'),        getInActiveList);


module.exports = router;


