const express = require('express'); 
const route = express.Router(); 
const optionController = require('../controllers/optionController'); 
const middleware = require('../middleware/middleware')

route.post('/add',  middleware.authenticator, optionController.addOption); 
route.get('/getAll', middleware.authenticator, optionController.getAllOptions);

module.exports = route; 