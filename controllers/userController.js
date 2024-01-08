const db = require('../database/database.js'); 
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config(); 

/**
 * Inscription utilisateur 
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Inscription utilisateurs
exports.register = async function (req, res) {
    try {
        const today = new Date();
        const { nom, email, mdp } = req.body;

        // Check if the email already exists
        const [resultEmail, field] = await db.query('SELECT * FROM users WHERE email = :email', {
            replacements: {email}
        });

        console.log('Email:', email);
        console.log('Result:', resultEmail);

        if (resultEmail.length > 0) {
            return res.status(400).json({ error: "Inscription impossible. Cet utilisateur existe déjà." });
        }

        // If the email is new, hash the password with bcrypt and save the user
        const hashMdp = await bcrypt.hash(mdp, 10); // 10 rounds
        const sql = `
            INSERT INTO users
            (nom, email, mdp, createdAt, updatedAt) 
            VALUES 
            (:nom, :email, :mdp, :createdAt, :updatedAt)
        `;
        await db.query(sql, {
            replacements: {
                nom,
                email,
                mdp: hashMdp,
                createdAt: today,
                updatedAt: today
            },
        });

        // Send JWT token for authentication
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error(`Erreur lors de la création du compte utilisateur.`, err);
        console.error('SQL Query:', err.sql); // Log the SQL query
        console.error('token:', err.token); // Log the SQL query
        res.status(500).json({ error: `Une erreur est survenue lors de la création du compte utilisateur.` });
    }
};

/**
 * Connexion utilisateur
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Login utilisateurs
exports.login = async function (req, res) {
    try {
        const { email, mdp } = req.body; 
        
        // Check if the email already exists 
        const [result, field] = await db.query('SELECT * FROM users WHERE email = :email', {
            replacements: {email}
        });
        if (result.length === 0) {
            return res.status(401).json({error: "Connexion impossible. Utilisateur non existant."}); 
        }

        // Get the hash mdp 
        const user = result[0]; 
        console.log(user); 
        // compare mdp avec mdp bcrypt (first parm = no hash mdp)
        const sameMdp = await bcrypt.compare(mdp, user.mdp)
        // if mdp = hash mdp return jwt token for sign
        if (!sameMdp) {
            return res.status(401).json({error: "Mot de passe incorrect."})
        } 

        let role;
        if (user.role === "admin") {
            role = "admin"; 
        }
        console.log('Utilisateur connecté avec le rôle .', role)
       
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch(err) {
        console.error('Erreur durant la connexion :', err); 
        res.status(500).json({ error: 'Erreur serveur.' });
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//user connexion

exports.connexionTemplateHtml = async function (req, res) {
    try {
        const filePath = path.join(__dirname, '../views/connexion.html');
        res.sendFile(filePath);
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).send(`Erreur : ${err.message}`);
    }
}

// user inscription
// User inscription
exports.inscriptionTemplateHtml = async function (req, res) {
    try {
        const filePath = path.join(__dirname, '../views/inscription.html');
        res.sendFile(filePath);
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).send(`Erreur : ${err.message}`);
    }
}
