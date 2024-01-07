const db = require('../database/database.js'); 
const path = require('path');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
require('dotenv').config(); 

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche toutes les commandes
exports.getAllCommandes = async function (req, res) {
    try {
        const sql = `
        SELECT c.*, u.nom FROM commandes AS c
        LEFT JOIN users AS u
        ON c.userId = u.id
        `;
        const  [result, field] = await db.query(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des commandes." });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche la liste des commandes dans une vue HTML 
exports.getAllCommandesInTemplateHtml = async function (req, res) {
    try {
        const filePath = path.join(__dirname, '../views/commandes.html');
        res.sendFile(filePath);
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).send(`Erreur : ${err.message}`);
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Calcule la somme des prix des commandes du même mois
exports.getTotalPricesByMonth = async function (req, res) {
    try {
        const sql = `
            SELECT 
                DATE_FORMAT(date_commande, '%Y-%m') AS mois,
                COUNT(*) AS nombreCommandes,
                SUM(prix_commande) AS sommePrix
            FROM commandes
            GROUP BY mois
        `;
        const [result, fields] = await db.query(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des commandes." });
    }
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche la somme des prix des commandes du même mois dans une vue HTML
exports.getTotalPriceCommandesInTemplateHtml = async function (req, res) {
    try {
        const filePath = path.join(__dirname, '../views/totalCommandes.html');
        res.sendFile(filePath);
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).send(`Erreur : ${err.message}`);
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche une commande selectionnée avec l'id
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
        (description_commande, nom_commande, date_commande, prix_commande, createdAt, updatedAt, userId) 
        VALUES 
        (:description_commande, :nom_commande, :date_commande, :prix_commande, :createdAt, :updatedAt, :id_user)
        `;
        await db.query(sql, {
            replacements: {
                description_commande,
                nom_commande,
                date_commande,
                prix_commande,
                createdAt: today,
                updatedAt: today,
                id_user,
            },
        });

        res.status(200).json({ message: "Commande ajouté avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une commande:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'ajout d'une commande." });
    }
}
