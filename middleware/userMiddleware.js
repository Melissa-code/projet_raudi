const jwt = require('jsonwebtoken')
const db = require('../database/database');
require('dotenv').config()

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Vérification si l'utilisateur est connecté + user
exports.authenticator_admin = (req, res, next) =>{
    // récupérer le token
    const token = req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            // décoder => next()
            else{
                console.log(decoded);


                const [result, field] = await db.query('SELECT role FROM users WHERE email = :email', {
                    replacements: {email}
                });

                if(result.length === 1 && result[0].role === ""){
                    next()
                }
                else{
                    res.status(403).json({erreur: "access denied"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}
