const PostController = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();

router.post('/add', PostController.createPost);
router.get('/get', PostController.getAllPost);
router.get('/get/:id', PostController.getPost);
router.delete('/delete/:id', PostController.delete);
router.patch('/update/:id', PostController.update);


module.exports = router;