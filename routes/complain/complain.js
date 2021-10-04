const router = require('express').Router();
const { authVerify } = require('../../utils/middlewares/authVerify');
const {
    add,
    edit,
    remove,
    getDetails,
    statusChange,
    getActiveList,
    getInActiveList,
    getServiceComplains,
    getPropertyComplains,
} = require('../../controllers/complain/complain');

router.post('/complain', authVerify, add);
router.put('/complain/:id', authVerify, edit);
router.delete('/complain/:id', authVerify, remove);
router.get('/complain', getActiveList);
router.get('/complain/:id', getDetails);
router.get('/inactive-complain', authVerify, getInActiveList);
router.get('/service-complain', getServiceComplains);
router.get('/property-complain', getPropertyComplains);
router.put('/complain/status-change/:id', authVerify, statusChange);


module.exports = router;