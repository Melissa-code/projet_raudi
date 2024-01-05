const express = require('express')
const route = express.Router()
const commandeController = require('../controllers/commandeController')

// route.get('/createAllTables', databaseController.createAllTable)
route.get('/getAll', commandeController.getAllCommandes); 
route.get('/get/:id', commandeController.getCommande); 
route.post('/add', commandeController.addCommande);

module.exports = route