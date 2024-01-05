const jwt = require('jsonwebtoken')
const db = require('../database/database');
require('dotenv').config()


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Vérification si l'utilisateur est connecté
exports.authenticator = (req, res, next) =>{
    // récupérer le token
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé : " + err})
            }
            // décoder => next()
            else{
                console.log(decoded);
                next()
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé : erreur"})
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Vérification si l'utilisateur est connecté + admin 
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
                const result = await db.query('SELECT role FROM utilisateur where email= ?',[decoded.email])
                if(result.length === 1 && result[0].role === "adminsitrateur"){
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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Vérification si l'utilisateur est comptable
exports.isComptable = async(req, res, next) =>{
    // récupérer le token
    const token = req.query.token || req.headers.authorization;

    if (!token){
        return res.status(401).json({erreur: "accès refusé : aucun token"})
    }
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    const email = decoded.email

    if (!email){
        return res.status(401).json({erreur: "accès refusé : aucun email"})
    }

    const sql = "SELECT * FROM utilisateur WHERE email = ?";
    const result = await db.query(sql, [email]);
    const db_role = result[0].role

    if (db_role === "comptable"){
        next()
    }
    else{
        res.status(403).json({erreur: "access denied"})
    }
}
