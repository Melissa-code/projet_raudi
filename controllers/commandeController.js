const db = require('../database/database.js'); 
const path = require('path');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
require('dotenv').config(); 

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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        const { description_commande, nom_commande, date_commande, prix_commande, } = req.body;
        const today = new Date();
        const token = req.headers.authorization;

        // récuperer email dans le token
        const decoded = jwt.decode(token, process.env.SECRET_KEY)
        const email = decoded.email

        var sql = 'SELECT * FROM users WHERE email = :email';
        const [result, field] = await db.query(sql, {
            replacements: {
                email
            }
        });
        const id_user = result[0].id

        sql = `
        INSERT INTO commandes 
        (userId, description_commande, nom_commande, date_commande, prix_commande, createdAt, updatedAt) 
        VALUES 
        (:id_user, :description_commande, :date_commande, :nom_commande, :prix_commande, :createdAt, :updatedAt)
        `;
        await db.query(sql, {
            replacements: {
                id_user,
                description_commande,
                nom_commande,
                date_commande,
                prix_commande,
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
