const Post = require("../models/Post");

const getPosts = (req, res) => {
    Post.find().sort({createdAt: 'desc'})
        .then(posts => res.render('posts/index', {title: "All Posts", posts: posts}))
        .catch(err => res.status(404).render('404', {title: 'Post Not Found', error: err}));
}

const getPost = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.render('posts/show', {post: post, title: post.title}))
        .catch(err => res.render('error', {error: err}));
}

const createPost = (req, res) => res.render('posts/create', {title: "Create New Post"})

const savePost = (req, res) => {
    const post = new Post(req.body);
    post.save()
        .then(() => res.redirect('/posts'))
        .catch(err => res.render('error', {error: err}));
}

const deletePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
        .catch(err => res.render('error', {error: err}));
}

const updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/'))
        .catch(err => res.render('error', {error: err}));
}

const editPost = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.render('posts/edit', {post: post, title: post.title}))
        .catch(err => res.render('error', {error: err}));
}

module.exports = {
    getPosts,
    savePost,
    createPost,
    getPost,
    deletePost,
    updatePost,
    editPost
}