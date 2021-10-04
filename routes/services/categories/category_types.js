const router = require('express').Router();
const { validation } = require('../../../utils/validations/category_types');
const { post, getList, update, remove, getDetails, status_change } = require('../../../controllers/services/categories/category_types');

router.post('/category-types',  post);
router.get('/category-types', getList);
router.get('/category-types/:id', getDetails);

router.put('/category-types/:id', validation, update);
router.put('/category-types-status/:id', status_change);
router.delete('/category-types/:id', remove);

module.exports = router;

