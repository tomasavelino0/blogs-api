const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts.controller');
const { validateToken } = require('../midlewares/validateJwt');
const { 
    validateUpdate, 
    validateIdUpdate, 
    validateUser, 
} = require('../midlewares/posts.midlewares');

router.post('/',
validateToken,
postsController.insertNewPostDb);

router.get('/',
validateToken,
postsController.listAllPosts);

router.get('/:id',
validateToken,
postsController.listPostById);

router.put('/:id',
validateToken,
validateUpdate,
validateIdUpdate,
postsController.updatePost);

router.delete('/:id',
validateToken,
validateUser,
postsController.deletePostDb);

module.exports = router;