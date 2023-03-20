const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { create, readAll, read, update, remove } = require('../controllers/sub');

router.post('/subs', authCheck, adminCheck, create);
router.get('/subs', readAll);
router.get('/subs/:slug', authCheck, adminCheck, read);
router.put('/subs/:slug', authCheck, adminCheck, update);
router.delete('/subs/:slug', authCheck, adminCheck, remove);

module.exports = router;