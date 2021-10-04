const router = require('express').Router();
const { validHowToOrder, validStatus } = require('../../utils/validations/validations');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const {
    add,
    edit,
    remove,
    getDetails,
    statusChange,
    getActiveList,
    getInActiveList,
} = require('../../controllers/order/howToOrder');


router.get('/how-to-order/:id', getDetails);
router.get('/how-to-order/',                  authVerify, hasAccess('can_view_htw'),   getActiveList);
router.get('/how-to-order/',                  authVerify, hasAccess('can_view_htw'),   getInActiveList);
router.delete('/how-to-order/:id',            authVerify, hasAccess('can_remove_htw'), remove);
router.post('/how-to-order',                  authVerify, hasAccess('can_create_htw'), validHowToOrder, add);
router.put('/how-to-order/:id',               authVerify, hasAccess('can_edit_htw'),   validHowToOrder, edit);
router.put('/how-to-order/status-change/:id', authVerify, hasAccess('can_edit_htw'),   validStatus,     statusChange);


module.exports = router;

