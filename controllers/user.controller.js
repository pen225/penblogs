const bcrypt = require('bcryptjs');
const models = require('../models');
const {validationResult} = require('express-validator');

class UserController {
    static insertUser = (req, res) => {
        const {nom, prenom, email, password} = req.body;
        
        // Verifier si les champs sont vides
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            models.User.findOne({where: {email:email}}).then((result) => {
            console.log('result', result);
            if (!result) {
                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    const user = {nom, prenom, email, password:hash};
                    console.log('user', user);
                    models.User.create(user).then((result) => {
                        res.status(200).json({
                            message: "Utilisateur enregistré avec succès",
                            resultat: result
                        })
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).json(err)
                        });
                    });
                });
            }else{
                res.json({
                    message: "Email exist"
                })
            }
        }).catch((err) => {
            
        });
        }
        
    }

    // Get all users
    static getAllUsers = (req, res) => {
        models.User.findAll().then((result) => {
            res.status(200).json({
                message: "Recuperation de tous les utilisateurs",
                resultat: result
            })
        }).catch((err) => {
            res.status(400).json({
                erreur: err
            })
        });
    }

    // Get all users
    static getUser = (req, res) => {
        let id = req.params.id;
        models.User.findByPk(id).then((result) => {
            if (result == null) {
                res.status(200).json({
                    message: "Utilisateur n'existe pas"
                })
            }else{
                res.status(200).json({
                    message: "Utilisateur recuperer avec succes",
                    resultat: result
                })
            }
        }).catch((err) => {
            res.status(400).json({
                erreur: err
            })
        });
    }

    // Delete user
    static deleteUser = (req, res) => {
        let id = req.params.id;
        models.User.destroy({where : { id: id} }).then((result) => {
            if (result == 0) {
                res.status(400).json({
                    message: "Utilisateur n'existe pas"
                })
            }else{
                res.status(200).json({
                    message: "Utilisateur supprimer avec succes",
                    resultat: result
                })
            }
        }).catch((err) => {
            res.status(400).json({
                erreur: err
            })
        });
    }

    // Update user
    static updateUser = (req, res) => {
        const id = req.params.id;
        const value = {...req.body}
        models.User.update(value, {where : { id: id} }).then((result) => {
            if (result == 0) {
                res.status(400).json({
                    message: "Utilisateur n'existe pas"
                })
            }else{
                res.status(200).json({
                    message: "Utilisateur modifier avec succes",
                    resultat: result
                })
            }
        }).catch((err) => {
            res.status(400).json({
                erreur: err
            })
        });
    }
}


module.exports = UserController;