const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Posts');
const User = require('../../models/User')
const auth = require('../../middleware/auth');
const Posts = require('../../models/Posts');

// Make a post
router.post('/',[ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { title, content } = req.body
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            title,
            content,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
        })
        const post = await newPost.save()
        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json('Server Error')
    }
})

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Get a particular Post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
});

// Like a post
router.put('/:postId/like', auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if ( post.likes.map(like => like.user.toSring() === user) > 0 ) {
        return res.status(400).json({ msg: 'Post already liked' })
    }
    post.likes.unshift({ user })
    await post.save()
    res.json(post.likes)
})

// Unlike A post
router.put('/:postId/unlike', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id)

        if(post.likes.filter(like => like.user.toString() === user).length === 0) {
            res.status(400).json({ msg: 'Post has not been liked by you' })
        }
        await post.save()
        res.json(post.likes)

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error')
    }
})

// Comment on a Post 
router.put('/:postId/comment', [ auth, [
    check('text', 'Text is required').not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(req.user.id).select('-password')
        const newComment = {
            user: req.user.id,
            text: text,
            name: user.name,
            avatar: user.avatar,
        }
        post.comments.unshift(newComment);
        await post.save();

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// Remove a comment
router.put('/:postId/comment/:commentId', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(req.user.id);

        const comment = post.comments.find(comment => comment === req.params.commentId)
        if (!comment) {
            return res.status(404).json({ msg: 'Post not found'});
        }

        if (comment.user.toSring() !== user) {
            return res.status(401).json({ msg: "You cant delete another person's comment" });
        }

        post.comments.filter(comment => {
            comment.id !== req.params.commentId
        })

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router