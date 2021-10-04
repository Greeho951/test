const router = require('express').Router();
const { add, edit, getDetails, remove, getBuildingLift } = require('../../../controllers/properties/liftAC/liftAC');
const { validLiftAC } = require('../../../utils/validations/properties');
const { hasAccess } = require('../../../utils/middlewares/hasAccess');
const { authVerify } = require('../../../utils/middlewares/authVerify');


router.post('/lift-ac', authVerify, validLiftAC, add);
router.put('/lift-ac/:id', authVerify, validLiftAC, edit);
router.delete('/lift-ac/:id', authVerify, remove);
router.get('/lift-ac/:id', authVerify, getDetails);
router.get('/building-equipment', getBuildingLift);


module.exports = router;