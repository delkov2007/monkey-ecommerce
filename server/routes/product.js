const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create, readAll, remove, read, update } = require('../controllers/product');

router.post('/products', authCheck, adminCheck, create);
router.get('/products/:count', readAll);
router.delete('/products/:slug', authCheck, adminCheck, remove);
router.get('/products/:slug/details', authCheck, adminCheck, read);
router.put('/products/:slug', authCheck, adminCheck, update);

module.exports = router;