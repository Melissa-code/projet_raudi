const User = require('../models/userModel')
const Commande = require('../models/commandeModel')
const Modele = require('../models/modeleModel')
const Options = require('../models/optionsModele')
const sequelize = require('../database/database')



exports.getAllTable = async(req, res)=>{
    try {
        const sql = `
        SELECT * FROM users
        `;
        const result = await sequelize.query(sql);
        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des tables:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
}

exports.addTable = async(req, res)=>{
    await sequelize.sync({alter: true})
    res.status(200).json('toutes les tables sont crées')
}

exports.editTable = async(req, res)=>{
    await sequelize.sync({force: true})
    res.status(200).json('toutes les tables sont modifiées')
}


exports.deleteTable = async(req, res)=>{
    await sequelize.drop()
    res.status(200).json('toutes les tables sont supprimées')
}    

