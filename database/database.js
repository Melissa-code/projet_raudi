const Sequelize = require('sequelize')

const sequelize = new Sequelize('raudi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// tester la connexion
sequelize.authenticate().then(()=>{
    console.log('authentification réussie')
}).catch((err)=>{
    console.log(err);
})

module.exports = sequelize

