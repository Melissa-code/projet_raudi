const express = require('express'); 
const route = express.Router(); 
const modeleController = require('../controllers/modeleController'); 
const middleware = require('../middleware/middleware')

route.get('/getAll', modeleController.getAllModele);
route.post('/:id/addOptions/', middleware.authenticator, modeleController.addOptionModele);
route.get('/get/:id', modeleController.getModele);
route.post('/add', middleware.authenticator, middleware.authenticator_admin, modeleController.addModele); 
route.put('/edit/:id', middleware.authenticator, middleware.authenticator_admin, modeleController.editModele);
route.delete('/delete/:id', middleware.authenticator, middleware.authenticator_admin, modeleController.deleteModele);

route.get('/', modeleController.getAllModelesInTemplateHtml); 
route.get('/:id', modeleController.getOneModeleInTemplateHtml); 

module.exports = route; 