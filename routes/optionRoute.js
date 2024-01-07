const express = require('express'); 
const route = express.Router(); 
const optionController = require('../controllers/optionController'); 
const middleware = require('../middleware/middleware')

route.get('/getAll', optionController.getAllOptions);
route.post('/add', optionController.addOption); 