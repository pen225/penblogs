const models  = require('../models');

const ModelQuery = class {
    // Post

    // Creer un post
    static addPost = (post) => {
        console.log("post query", post);
        models.Post.create(post).then((result) => {
            return result
        }).catch((err) => {
            return err
        });
    }
}

module.exports = ModelQuery;