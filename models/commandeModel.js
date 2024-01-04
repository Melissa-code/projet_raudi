const sequelize = require('../database/database')
const Sequelize = require('sequelize')

const Commande = sequelize.define('commande', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description_commande: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nom_commande: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_commande: {
        type: Sequelize.DATE,
        allowNull: false
    },
    prix_commande: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
})

module.exports = Commande