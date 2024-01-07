const express = require('express')
const route = express.Router()
const commandeController = require('../controllers/commandeController')
const middleware = require('../middleware/middleware')

route.get('/commandes', middleware.authenticator, middleware.isComptable, commandeController.getAllCommandesInTemplateHtml);
route.get('/totalPrixCommandes', middleware.authenticator, middleware.isComptable, commandeController.getTotalPriceCommandesInTemplateHtml);

route.get('/getTotalPrices', middleware.authenticator, middleware.isComptable, commandeController.getTotalPricesByMonth); 
route.get('/getAll', middleware.authenticator, middleware.isComptable, commandeController.getAllCommandes); 
route.get('/get/:id', middleware.authenticator, middleware.isComptable, commandeController.getCommande); 
route.post('/add', middleware.authenticator, commandeController.addCommande);

module.exports = route