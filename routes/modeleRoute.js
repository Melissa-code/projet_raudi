const express = require('express'); 
const route = express.Router(); 
const modeleController = require('../controllers/modeleController'); 
const middleware = require('../middleware/middleware')

/**
 * Route pour ajouter un nouveau modèle
 */
route.get('/getAll', modeleController.getAllModele);
route.get('/get/:id', modeleController.getModele);
route.post('/add',  middleware.authenticator, middleware.authenticator_admin, modeleController.addModele); 
route.put('/edit/:id',  middleware.authenticator,middleware.authenticator_admin, modeleController.editModele);
route.delete('/delete/:id', middleware.authenticator,middleware.authenticator_admin, modeleController.deleteModele);

route.get('', modeleController.getAllModelesInTemplateHtml); 

module.exports = route; 