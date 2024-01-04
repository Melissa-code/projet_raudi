const express = require('express'); 
const route = express.Router(); 
const modeleController = require('../controllers/modeleController'); 

/**
 * Route pour ajouter un nouveau modèle
 */
route.post('/', modeleController.addModel); 

module.exports = route; 