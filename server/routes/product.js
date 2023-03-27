const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create } = require('../controllers/product');

router.post('/products', authCheck, adminCheck, create);

module.exports = router;