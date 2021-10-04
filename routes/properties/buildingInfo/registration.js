const router = require('express').Router();
const {post, update, remove, getDetails} = require('../../../controllers/properties/buildingInfo/registration');

router.post('/registration', post);
router.put('/registration/:id', update);
router.delete('/registration/:id', remove);
router.get('/registration/:id', getDetails);
 
module.exports = router;