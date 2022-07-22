const bcrypt = require('bcryptjs');
const models = require('../models');
const {validationResult} = require('express-validator');

class UserController {

    // Get user form
    static inscriptionUserForm = (req, res) => {
        res.render('inscriptionUser', {err: "", response: "", err_mail: ""})
    }

    // User Connexion
    static connexionUserForm = (req, res) => {
        res.render('connexionUser')
    }

    // Insert user
    static insertUser = (req, res) => {
        const {nom, prenom, email, password} = req.body;
        
        // Verifier si les champs sont vides
        const errors = validationResult(req);
        const err = errors.mapped();
        if (!errors.isEmpty()) {
            console.log('err', err);
            res.render('inscriptionUser', {err:err, err_mail: "", response:req.body});
            // return res.status(400).json({ errors: errors.array() });
        }else{
            // Verifier si l'email exist dans la base de donnee
            models.User.findOne({where: {email:email}}).then((result) => {
            console.log('result', result);
            if (!result) {
                bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    const user = {nom, prenom, email, password:hash};
                    console.log('user', user);
                    res.redirect('/users/connexion')
                    models.User.create(user).then((result) => {
                        res.redirect('/users/connexion')
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).json(err)
                        });
                    });
                });
            }else{
                res.render('inscriptionUser', {err:err, err_mail: "Email exist", response:req.body});
                console.log({err_mail: "Email exist"});
            }
        })
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