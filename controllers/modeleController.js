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
//Affiche tous les modeles 
exports.getAllModele = async function (req, res) {
    try {
        const sql = `
        SELECT * FROM modeles
        `;
        const  [result, field] = await db.query(sql);

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des modèles:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des modèles." });
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//Affiche un modele selectionner avec l'id

exports.getModele = async function (req, res) {
    try {
        const id = req.params.id;
        const sql = `
        SELECT * FROM modeles WHERE id = :id
        `;

        const  [result, field] = await db.query(sql, {
            replacements: {
                id
            }
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Erreur lors de la récupération des modèles:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des modèles." });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Ajoute un modele
exports.addModele = async function (req, res) {
    try {
        const { nom, desc, prix, image, taille, nb_places, type_moteur } = req.body;
        const today = new Date();

        const sql = `
        INSERT INTO modeles 
        (nom_modele, description_modele, prix_modele, image_modele, taille_modele, nb_places_modele, type_moteur_modele, createdAt, updatedAt) 
        VALUES 
        (:nom, :desc, :prix, :image, :taille, :nb_places, :type_moteur, :createdAt, :updatedAt)
        `;

        const result = await db.query(sql, {
            replacements: {
                nom,
                desc,
                prix,
                image,
                taille,
                nb_places,
                type_moteur,
                createdAt: today,
                updatedAt: today
            }
        });

        res.status(200).json({ message: "Modèle créé avec succès.", insertedId: result.insertId });
    } catch (error) {
        console.error("Erreur lors de la création du modèle:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création du modèle." });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Modifie un modele 
exports.editModele = async function (req, res) {
    try {
        const { nom, desc, prix, image, taille, nb_places, type_moteur } = req.body;
        const today = new Date();
        const id = req.params.id;

        const sql = ` UPDATE modeles SET nom_modele = :nom, description_modele = :desc, prix_modele = :prix, image_modele = :image, taille_modele = :taille, nb_places_modele = :nb_places, type_moteur_modele = :type_moteur, updatedAt = :updatedAt WHERE id = :id`;

        const result = await db.query(sql, {
            replacements: {
                nom,
                desc,
                prix,
                image,
                taille,
                nb_places,
                type_moteur,
                updatedAt: today,
                id
            }
        });

        res.status(200).json({ message: "Modèle modifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la modification du modèle:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la modification du modèle." });
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Supprimer le modele en fonction de l'id

exports.deleteModele = async function (req, res) {
    try {
        const id = req.params.id;

        const sql = `DELETE FROM modeles WHERE id = :id`;

        await db.query(sql, {
            replacements: {
                id
            }
        });

        res.status(200).json({ message: "Modèle supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du modèle:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du modèle." });
    }
}
