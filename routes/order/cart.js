const router = require('express').Router();
const { validCart } = require('../../utils/validations/services');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const {
    add,
    removeMyCart,
    getDetails,
    getCartList,
    getMyCart,
    conformation,
} = require('../../controllers/order/cart');


/* USER_API */
router.post('/cart', authVerify, validCart, add);
router.get('/cart', authVerify, getMyCart);
router.delete('/cart', authVerify, removeMyCart);

/* ADMIN_API */
router.put('/cart/:id', authVerify, hasAccess('can_edit_cart'), conformation);
router.get('/cart/:id', authVerify, hasAccess('can_view_cart'), getDetails);
router.get('/cart-list', authVerify, hasAccess('can_view_cart'), getCartList);


module.exports = router;

