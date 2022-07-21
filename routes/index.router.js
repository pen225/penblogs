const express = require('express');
const IndexController = require('../controllers/index.controller');
const router = express.Router();


router.get('/', IndexController.accueil);


module.exports = router