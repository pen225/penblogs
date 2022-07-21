const UserController = require("../controllers/user.controller");
const express = require('express');
const { validator, result } = require('../middlware/express-validator.inscriptionUser');
const router = express.Router();


router.post('/add', validator, UserController.insertUser);
router.get('/get', UserController.getAllUsers);
router.get('/get/:id', UserController.getUser);
router.delete('/delete/:id', UserController.deleteUser);
router.patch('/update/:id', UserController.updateUser);


module.exports = router;