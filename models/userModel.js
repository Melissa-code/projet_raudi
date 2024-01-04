const sequelize = require('../database/database')
const Sequelize = require('sequelize')
const Commande = require('./commandeModel')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    mdp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

User.hasMany(Commande, { foreignKey: 'userId'})
Commande.belongsTo(User, { foreignKey: 'userId'})

module.exports = User