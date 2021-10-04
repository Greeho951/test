const router = require('express').Router();
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { validSubCategory, validStatus } = require('../../../utils/validations/services');
const {
    add,
    edit,
    remove,
    statusChange,
    getActiveList,
    getInActiveList,
} = require('../../../controllers/services/categories/subCategory');


router.post('/sub-category',           authVerify, hasAccess('can_create_category_subCategory'), validSubCategory, add);
router.put('/sub-category/:id',        authVerify, hasAccess('can_edit_category_subCategory'),   validSubCategory, edit);
router.put('/sub-category-status/:id', authVerify, hasAccess('can_edit_category_subCategory'),   validStatus,      statusChange);
router.delete('/sub-category/:id',     authVerify, hasAccess('can_remove_category_subCategory'), remove);
router.get('/sub-category',            authVerify, hasAccess('can_view_category_subCategory'),   getActiveList);
router.get('/inactive-sub-category',   authVerify, hasAccess('can_view_category_subCategory'),   getInActiveList);


module.exports = router;

