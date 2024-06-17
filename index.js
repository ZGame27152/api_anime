const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
const app = express();

app.use(cors());

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.get('/anime', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM anime');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).send(`Error executing query: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware to handle unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).send('Unexpected error occurred');
});
