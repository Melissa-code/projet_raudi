const express = require('express')
const route = express.Router()
const databaseController = require('../controllers/databaseController')

// route.get('/createAllTables', databaseController.createAllTable)
route.post('/add', databaseController.addTable); 
route.put('/edit/:id', databaseController.editTable);
route.delete('/delete/:id', databaseController.deleteTable);

module.exports = route