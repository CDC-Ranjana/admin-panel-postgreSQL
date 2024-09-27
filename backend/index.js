const express = require('express');

const PORT = 8080
const pool = require('./config/db'); // Import the pool from your db.js file

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Test the connection on startup
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connected to the database', time: result.rows[0].now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT , ()=>console.log(`Server is listening on http://localhost:${PORT}`));
