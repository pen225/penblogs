const ModelQuery = require('../database/models.query');
const models = require('../models');

const PostController = class{
    // Creer un post
    static createPost =(req, res) => {
        const post = {...req.body};
        try {
            const addpost = ModelQuery.addPost(post)
            res.status(200).json({
                message: "Insert post reussie"
            })
        } catch (error) {
            res.status(500).json({
            err:error
        })
        }
    }
    // Get all post
    static getAllPost =(req, res) => {
        models.Post.findAll().then((result) => {
            res.status(200).json({
                message: "Recuperation de tous les posts",
                post: result
            })
        }).catch((err) => {
            console.log('err recup', err);
            res.status(500).json({
                err:err
            })
        });
    }

    // Get one post by id
    static getPost =(req, res) => {
        let id = req.params.id;
        models.Post.findByPk(id).then((result) => {
            res.status(200).json({
                message: "Recuperation du post",
                post: result
            })
        }).catch((err) => {
            console.log('err recup', err);
            res.status(500).json({
                err:err
            })
        });
    }

    // Delete post
    static delete =(req, res) => {
        let id = req.params.id;
        models.Post.destroy({where: {id: id}}).then((result) => {
            res.status(200).json({
                message: "Post supprimé avec succes",
                post: result
            })
        }).catch((err) => {
            console.log('err supp', err);
            res.status(500).json({
                err:err
            })
        });
    }

    // Update post
    static update =(req, res) => {
        let id = req.params.id;
        const value = {...req.body}
        models.Post.update(value, {where: {id: id}}).then((result) => {
            res.status(200).json({
                message: "Post modifié avec succes",
                post: result
            })
        }).catch((err) => {
            console.log('err supp', err);
            res.status(500).json({
                err:err
            })
        });
    }
}


module.exports = PostController;