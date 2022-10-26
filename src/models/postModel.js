
var connection = require('./../../config/db.config')

var Post = function (post) {
    this.post_id    = post.post_id;
    this.post_name  = post.post_name;
    this.salary     = post.salary;
}

Post.findAll = function (result) {
    connection.query("SELECT * FROM post", function (err, res) {
        if (err) {
            console.log("Error while fetching posts: ", err);
            result(null, err);
        }
        else {
            console.log('Post fetched successfully: ');
            result(null, res);
        }
    });
};

Post.create = function (newPost, result) {
    connection.query("INSERT INTO post SET ?", newPost, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err)
        } else {
            console.log(res);
            result(null, res)
        }
    })
}

Post.delete = function (id, result) {
    connection.query("DELETE FROM post WHERE post_id = ?",[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Post