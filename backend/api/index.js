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



 