const router = require("express").Router();
const PostController = require("../controllers/PostController");

// Get all posts
router.get('/', PostController.getPosts);
// create new post
router.get('/create', PostController.createPost);
// save new post
router.post('/', PostController.savePost);
// Get post
router.get('/:id', PostController.getPost);
// Delete post
router.delete('/:id', PostController.deletePost);
// Edit post
router.get('/:id/edit', PostController.editPost);
// Update post
router.put('/:id', PostController.updatePost);

module.exports = router;