const db = require('../database/database.js'); 
const path = require('path');

/**
 * Ajouter un nouveau modele
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.addModel = async function (req, res) {
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