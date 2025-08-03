const express = require('express');
const router = express.Router();
const {uploadFile} = require('../../controllers/uploads/controller');
const authMiddleware = require('../../middlewares/authMiddleware');
const upload = require('../../middlewares/upload')

// Protected route for file upload
router.post('/', authMiddleware, upload.single('file'), uploadFile);

module.exports = router;