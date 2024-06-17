const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.get('/anime', (req, res) => {
  connection.query('SELECT * FROM anime', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);  // เพิ่มการแสดงผล error stack
      res.status(500).send(`Error executing query: ${err.message}`);
      return;
    }
    res.json(results);
  });
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
