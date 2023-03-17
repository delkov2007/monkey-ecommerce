const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck } = require('../middlewares/auth');

//Controllers
const { createOrUpdateUser } = require('../controllers/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;