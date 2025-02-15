const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const iport = 3000;

// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PostgreSQL connection configuration
const poolconnect = {
  user: 'postgres',
  host: 'localhost',
  database: 'collider',
  password: 'mecha213',
  port: 5432,
};

const pool = new Pool(poolconnect);

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/merlin.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { num, name, job } = req.body; // Get data from the form

  // Insert data into PostgreSQL
  const query = 'INSERT INTO astrolist (serial, name, role) VALUES ($1, $2, $3)';
  const values = [num, name, job];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted successfully');
      res.send('Data inserted successfully');
    }
  });
});

// Start the server
app.listen(iport, () => {
  console.log(`Server running on http://localhost:${iport}`);
});