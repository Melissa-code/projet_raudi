const sequelize = require('../database/database')
const Sequelize = require('sequelize')
const Commande = require('./commandeModel')
const Modele = require('./modeleModel')

const Modele = sequelize.define('modele', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom_modele: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description_modele: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    prix_modele: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    image_modele: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taille_modele: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nb_places_modele: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type_moteur_modele: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

Modele.belongsToMany(Commande, { through: 'CommandeModele'})
Commande.belongsToMany(Modele, { through: 'CommandeModele'})

module.exports = Modele