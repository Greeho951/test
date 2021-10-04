const router = require('express').Router();
const { authVerify } = require('../../utils/middlewares/authVerify');
const {post} = require('../../controllers/ratting/ratting');

router.post('/ratting',authVerify, post);

module.exports = router;