const router = require('express').Router();
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { validCategory, validStatus } = require('../../../utils/validations/services');


const { 
    add, 
    edit,
    remove, 
    getDetails, 
    statusChange,
    getActiveList, 
    getInActiveList 
} = require('../../../controllers/services/categories/category');


router.post('/category',           authVerify, hasAccess('can_create_category_subCategory'), validCategory,   add);
router.put('/category/:id',        authVerify, hasAccess('can_edit_category_subCategory'),   validCategory,   edit);
router.put('/category-status/:id', authVerify, hasAccess('can_edit_category_subCategory'),   validStatus,     statusChange);
router.delete('/category/:id',     authVerify, hasAccess('can_remove_category_subCategory'),                  remove);
router.get('/category',            authVerify, hasAccess('can_view_category_subCategory'),                    getActiveList);
router.get('/category-inactive',   authVerify, hasAccess('can_view_category_subCategory'),                    getInActiveList);
router.get('/category/:id',        authVerify, hasAccess('can_view_category_subCategory'),                    getDetails);


module.exports = router;