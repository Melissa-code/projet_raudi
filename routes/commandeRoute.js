const express = require('express')
const route = express.Router()
const commandeController = require('../controllers/commandeController')
const middleware = require('../middleware/middleware')


// route.get('/createAllTables', databaseController.createAllTable)
route.get('/getAll',  middleware.authenticator, middleware.isComptable,commandeController.getAllCommandes); 
route.get('/get/:id', middleware.authenticator, middleware.isComptable, commandeController.getCommande); 
route.post('/add', middleware.authenticator,commandeController.addCommande);

module.exports = route