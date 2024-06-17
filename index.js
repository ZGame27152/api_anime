const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.get('/', (req, res) => {
  res.send('Hello world!!');
});

app.get('/anime', (req, res) => {
  connection.query('SELECT * FROM anime', function (err, results, fields) {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(results);
  });
});

// เพิ่มการจัดการข้อผิดพลาดสำหรับ Express
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Unexpected error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
