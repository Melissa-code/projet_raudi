const express =  require('express')
const cors =  require('cors')
const databaseRoute = require('./routes/databaseRoutes')
const modeleRoute = require('./routes/modeleRoute')
const userRoute = require('./routes/userRoute')
const commandeRoute = require('./routes/commandeRoute')
const optionRoute = require('./routes/optionRoute')

const sequelize = require('./database/database')

const app = express(); 

app.use(express.json())
app.use(cors())

app.use('/', modeleRoute)
app.use('/database', databaseRoute)
app.use('/modeles', modeleRoute)
app.use('/users', userRoute)
app.use('/commandes', commandeRoute)
app.use('/options', optionRoute)

app.listen(8000, ()=> {
    console.log('serveur lancé sur le port 8000');
})
