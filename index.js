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

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
      'SELECT * FROM users WHERE id = ?', [id],
      function (err, results, fields) {
          res.send(results)
      }
  )
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware to handle unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.stack);
  res.status(500).send('Unexpected error occurred');
});
