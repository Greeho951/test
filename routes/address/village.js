const router = require('express').Router();
const { createVillage, getVillages, update, remove } = require('../../controllers/address/village');
const { validVillage1 } = require('../../utils/validations/address');


router.post('/village', validVillage1, createVillage);
router.put('/village/:id', update);
router.delete('/village/:id', remove);
router.get('/village', getVillages);


module.exports = router;