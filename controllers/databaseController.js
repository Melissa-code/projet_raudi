const User = require('../models/userModel')
const Commande = require('../models/commandeModel')
const Modele = require('../models/modeleModel')
const Options = require('../models/optionsModele')
const sequelize = require('../database/database')

exports.createAllTable = async(req, res)=>{
    await sequelize.sync({alter: true})
    res.status(200).json('toutes les tables sont crées')
}

