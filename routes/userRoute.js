const express = require('express'); 
const route = express.Router(); 
const userController = require('../controllers/userController'); 

route.post('/', userController.register); 
route.post('/connexion', userController.login); 
route.get('/se_connecter', userController.connexionTemplateHtml);
route.get('/inscription', userController.inscriptionTemplateHtml);



module.exports = route; 