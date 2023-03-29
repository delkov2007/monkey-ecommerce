const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//Controllers
const { upload, remove } = require('../controllers/cloudinary');

router.post('/upload-images', authCheck, adminCheck, upload);
router.post('/remove-image', authCheck, adminCheck, remove);

module.exports = router;