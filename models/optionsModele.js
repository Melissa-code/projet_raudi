const sequelize = require('../database/database')
const Sequelize = require('sequelize')
const Commande = require('./commandeModel')
const Modele = require('./modeleModel')

const Options = sequelize.define('options', {
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
    }
})

Options.belongsToMany(Modele, { through: 'ModeleOptions'})
Modele.belongsToMany(Options, { through: 'ModeleOptions'})

module.exports = Options