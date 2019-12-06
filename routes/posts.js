const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/add').post((req, res) => {
    const {text} = req.body;
    const newPost = new Post({text});
    console.log(newPost);

    newPost.save()
        .then(() => res.json('Post added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getAllPosts').get((req, res) => {
   Post.find({})
       .sort({updatedAt: -1})
       .then((doc) => res.json(doc))
       .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;