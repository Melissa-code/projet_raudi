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
        console.log('coucou');
        const { nom, desc, prix, image, taille, nb_places, type_moteur } = req.body;
        // Check the data in Postman 
        if (!nom || !desc || !prix || !image || !taille || !nb_places || !type_moteur) {
            return res.status(400).json({ error: "Veuillez fournir les bonnes données" });
        }
        // Insert the user in the DB 
        var sql = "INSERT INTO modeles (nom_modele, description_modele, prix_modele, image_modele, taille_modele, nb_places_modele, type_moteur_modele, createdAt, updatedAt) VALUES ('"+nom+"', '"+desc+"', "+prix+", '"+image+"', '"+taille+"', "+nb_places+", '"+type_moteur+"', '2024-01-04 00:00:00', '2024-01-04 00:00:00');";
        const result = await db.query(sql);

        res.status(200).json({ message: "Modèle créé avec succès.", insertedId: result.insertId });
    } catch (error) {
        console.error("Erreur lors de la création du modèle:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création du modèle." });
    }
}