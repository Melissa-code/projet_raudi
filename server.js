const express =  require('express')
const cors =  require('cors')

const sequelize = require('./database/database')

const app = express(); 

app.use(express.json())
app.use(cors())




app.listen(8000, ()=> {
    console.log('serveur lancé sur le port 8000');
})