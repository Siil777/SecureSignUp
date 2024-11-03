const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'api')));

const allowedOrigins = ['https://siil777.github.io', 'http://localhost:3000', 'http://localhost:5000'];

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
let conn;
const initializeDB = async () => {
    try{
        conn = mysql.createPool({
            user: 'root',
            host: 'localhost',
            database: 'auth',
            password: ''
        });
    }catch(e){
        console.error(e);
    }
}
initializeDB()
    .then(()=>{
        console.log('Database connection pool created');
    })
    .catch((error)=>{
        console.error('connection error', error);
    })

const checkDatabaseConnection = async () => {
    try {
        const connection = await conn.getConnection();
        console.log('connection estabilished successfully!');
        const [rows] = await conn.query('SELECT*FROM users');
        console.log('user data', rows);
        connection.release();
    } catch (e) {
        console.error('error of connection of the database', e);
    }
}
checkDatabaseConnection();
app.get('/users', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT*FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'internal server error' })
    }
})
/* app.post('/', (req,res)=>{
    res.redirect('/email/register');
}) */
app.post('/email/register', async (req, res) => {
    const { email, password, username } = req.body;
    console.log(email,password,username);
    try {
        const [userCheck] = await conn.query('SELECT*FROM users WHERE email = ?', [email]);
        if (userCheck.length > 0) {
            return res.status(400).json({ message: 'email has been already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await conn.query('INSERT INTO users (email,password_hash, username) VALUES (?,?,?)',
            [email, hashedPassword, username]
        );
        res.status(201).json({ message: 'user registered successfully', user: { id: newUser.insertId, email, username } })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'internal server error' });
    }
});
app.post('/email/login', async (req, res) => {
    try {
        console.log('Incoming request body:', req.body);
        const { email, password } = req.body;

       if (!email || !password) {
            return res.status(422).json({ message: 'Email and password are required' });
        }
        const [users] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Users fetched from database:', users);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        console.log('Password validation result:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.error('Error in /email/login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
/////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); 
const port = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ['https://siil777.github.io', 'http://localhost:3000','http://localhost:5000'];

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


app.get('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
module.exports = app;
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-apikey'],
    credentials: true, 
};

app.use(cors(corsOptions));


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://siil777.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};