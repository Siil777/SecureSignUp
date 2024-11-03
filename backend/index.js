const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'https://siil777.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-apikey'],
    credentials: true, 
};

app.use(cors(corsOptions));
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'api')));

app.get('/', allowCors((req, res) => {
    res.send('app!');
}));

app.post('/email/register', async (req, res) => {
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
    }
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

        if (!user) return res.status(401).json({ message: 'Invalid email or password' });


        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).json({ message: 'Invalid email or password' });
        res.status(200).json({
            message: 'Login successful!',
            user: { id: user.id, email: user.email, username: user.username }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = app;




 