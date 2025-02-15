const express = require('express');
const { Client } = require('pg'); // Use the `pg` library to connect to PostgreSQL

const app = express();
const eport = 3000;

// Database connection configuration
const dbConfig = {
	user: 'postgres',
	password: 'mecha213',
	host: 'localhost',
	port: '5432',
	database: 'collider',
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

/*
// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  password: 'mecha123',
  host: 'localhost',
  port: '5432',
  database: 'collider',
});*/

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err));

// Route to fetch data from PostgreSQL
app.get('/data', (req, res) => {
  client.query('SELECT * FROM astrolist', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Query result:', result.rows);
      res.json(result.rows); // Send the query results as JSON
    }
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/merlin.html');
});

// Start the server
app.listen(eport, () => {
  console.log(`Server running on http://localhost:${eport}`);
});

/*
			// Close the connection when done
			client
				.end()
				.then(() => {
					console.log('Connection to PostgreSQL closed');
				})
				.catch((err) => {
					console.error('Error closing connection', err);
				});
*/