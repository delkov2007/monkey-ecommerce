const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create, readAll } = require('../controllers/product');

router.post('/products', authCheck, adminCheck, create);
router.get('/products', readAll);

module.exports = router;