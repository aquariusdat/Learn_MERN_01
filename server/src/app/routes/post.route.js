const express = require('express')
const router = express.Router();
const postController = require('../controllers/post.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, postController.getPost)
router.post('/', verifyToken, postController.createPost)

module.exports = router;