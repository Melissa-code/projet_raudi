const express = require('express'); 
const route = express.Router(); 
const userController = require('../controllers/userController'); 

route.post('/', userController.register); 
route.post('/connexion', userController.login); 

module.exports = route; 