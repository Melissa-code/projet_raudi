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
            (nom, email, mdp, role, createdAt, updatedAt) 
            VALUES 
            (:nom, :email, :mdp, :role, :createdAt, :updatedAt)
        `;
        await db.query(sql, {
            replacements: {
                nom,
                email,
                mdp: hashMdp,
                role: null,
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

