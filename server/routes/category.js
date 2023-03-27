const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create, readAll, read, getCategorySubs, update, remove } = require('../controllers/category');

router.post('/categories', authCheck, adminCheck, create);
router.get('/categories', readAll);
router.get('/categories/:slug', authCheck, adminCheck, read);
router.get('/categories/:slug/subs', authCheck, adminCheck, getCategorySubs);
router.put('/categories/:slug', authCheck, adminCheck, update);
router.delete('/categories/:slug', authCheck, adminCheck, remove);

module.exports = router;