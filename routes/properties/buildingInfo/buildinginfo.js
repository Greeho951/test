const router = require('express').Router();
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');
const { add, edit, remove, getDetails } = require('../../../controllers/properties/buildingInfo/buildingInfo');


router.post('/building-info', authVerify, add);
router.put('/building-info/:id', authVerify, edit);
router.delete('/building-info/:id', authVerify,hasAccess('can_delete_building_info'), remove);
router.get('/building-info/:id', authVerify, getDetails);


module.exports = router;