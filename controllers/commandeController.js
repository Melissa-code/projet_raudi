const db = require('../database/database.js'); 
const path = require('path');

/**
 * Ajouter un nouveau modele
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche toutes les commande
exports.getAllCommandes = async function (req, res) {
    try {
        const sql = `
        SELECT * FROM commandes
        `;
        const  [result, field] = await db.query(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des commandes." });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche une commande selectionner avec l'id
exports.getCommande = async function (req, res) {
    try {
        const id = req.params.id;
        const sql = `
        SELECT * FROM commandes WHERE id = :id
        `;

        const  [result, field] = await db.query(sql, {
            replacements: {
                id
            }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des commandes." });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Ajoute une commande
exports.addCommande = async function (req, res) {
    try {
        const { id_user, id_modele, date_commande, date_livraison, prix_total } = req.body;
        const today = new Date();

        const sql = `
        INSERT INTO commandes 
        (id_user, id_modele, date_commande, date_livraison, prix_total, createdAt, updatedAt) 
        VALUES 
        (:id_user, :id_modele, :date_commande, :date_livraison, :prix_total, :createdAt, :updatedAt)
        `;
        await db.query(sql, {
            replacements: {
                id_user,
                id_modele,
                date_commande,
                date_livraison,
                prix_total,
                createdAt: today,
                updatedAt: today
            },
        });

        res.status(200).json({ message: "Commande ajouté avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une commande:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'ajout d'une commande." });
    }
}