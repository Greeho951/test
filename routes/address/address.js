const router = require('express').Router();
const{validAddress} = require('../../utils/validations/address');
const { hasAccess } = require('../../utils/middlewares/hasAccess');
const { authVerify } = require('../../utils/middlewares/authVerify');
const { post, update, remove, getAddress } = require('../../controllers/address/address');


router.delete('/address/:id', authVerify, remove);
router.get('/address/:id',    authVerify, getAddress);
router.post('/address',       authVerify, validAddress, post);
router.put('/address/:id',    authVerify, validAddress, update);


module.exports = router;

