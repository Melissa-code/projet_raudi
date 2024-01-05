const express = require('express'); 
const route = express.Router(); 
const modeleController = require('../controllers/modeleController'); 

/**
 * Route pour ajouter un nouveau modèle
 */
route.get('/getAll', modeleController.getAllModele);
route.post('/add', modeleController.addModele); 
route.put('/edit/:id', modeleController.editModele);
route.delete('/delete/:id', modeleController.deleteModele);

module.exports = route; 