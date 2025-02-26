const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose(); 
const port = process.env.PORT || 5000;

const app = express();

const allowedOrigins = ['https://siil777.github.io', 'http://localhost:3000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password_hash TEXT,
            username TEXT
        )`);
    }
});
app.get('/',((req, res) => {
    res.send('App is running!');
}));


app.post('/email/register', async (req, res) => {
    console.log('registered response received', req.body);
    const { email, password, username } = req.body;

    try {
        const userCheck = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (userCheck) return res.status(409).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)', [email, hashedPassword, username], function(err) {
                if (err) reject(err);
                resolve({ id: this.lastID });
            });
        });
        res.status(201).json({
            message: 'User registered successfully!',
            user: { id: this.lastID, email, username }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    };
});


app.post('/email/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error in /email/login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



 