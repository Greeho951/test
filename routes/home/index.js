const router = require('express').Router();
const { home, subCategory, category, cart, address, unitInfo, property } = require('../../controllers/home/index');


router.get('/', home);
router.get('/cart-api', cart);
router.get('/category-api', category);
router.get('/sub-category-api', subCategory);
router.get('/address-api', address);
router.get('/lift-ac-api', unitInfo);
router.get('/property-api', property);


module.exports = router;

