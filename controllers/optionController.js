const db = require('../database/database.js'); 
const path = require('path');

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche toutes les options
exports.getAllOptions = async function (req, res) {
    try {
        const sql = `
        SELECT * FROM options
        `;
        const  [result, field] = await db.query(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des options:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des options." });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Ajoute une option 
exports.addOption = async function (req, res) {
    try {
        const { nom, desc } = req.body;
        const today = new Date();

        const sql = `
        INSERT INTO options 
        (nom_modele, description_modele, createdAt, updatedAt) 
        VALUES 
        (:nom, :desc, :createdAt, :updatedAt)
        `;

        const result = await db.query(sql, {
            replacements: {
                nom, 
                desc,
                createdAt: today,
                updatedAt: today
            }
        });

        res.status(200).json({ message: "Option ajoutée avec succès.", insertedId: result.insertId });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'option:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de l'option." });
    }
}