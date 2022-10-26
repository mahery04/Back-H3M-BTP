
const Post = require('../models/postModel')

exports.findAll = function (req, res) {
    Post.findAll(function (err, post) {
        if (err) res.send(err);
        console.log('res', post);
        res.send(post);
    });
};

exports.create = function (req, res) {
    const newPost = new Post(req.body)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Post.create(newPost, function (err, post) {
            if (err) res.send(err);
            res.json({ error: false, message: "Post added successfully!" });
        });
    }
}

exports.delete = function (req, res) {
    Post.delete(req.params.id, function (err, post) {
        if (err) res.send(err);
        res.json({ error: false, message: 'Post successfully deleted' });
    });
};