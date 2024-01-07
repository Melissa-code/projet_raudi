const express = require('express'); 
const route = express.Router(); 
const optionController = require('../controllers/optionController'); 
const middleware = require('../middleware/middleware')

route.get('/getAll', middleware.authenticator, optionController.getAllOptions);
route.post('/add', middleware.authenticator, middleware.authenticator_admin, optionController.addOption); 

module.exports = route; 