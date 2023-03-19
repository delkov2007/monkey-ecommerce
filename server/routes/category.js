const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create, readAll, read, update, remove } = require('../controllers/category');

router.get('/categories', readAll);
router.get('/categories/:slug', authCheck, adminCheck, read);
router.post('/categories/:slug', authCheck, adminCheck, create);
router.put('/categories/:slug', authCheck, adminCheck, update);
router.delete('/categories/:slug', authCheck, adminCheck, remove);

module.exports = router;