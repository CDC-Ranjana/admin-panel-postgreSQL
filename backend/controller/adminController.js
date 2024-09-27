const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register a new admin (only accessible by super admins)
const registerAdmin = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin into the database
    const newAdmin = await pool.query(
      'INSERT INTO admins (name, email, password, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, phone, role]
    );

    res.status(201).json(newAdmin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Admin login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (admin.rows.length === 0) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, admin.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.rows[0].id, role: admin.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get all admins (Super admin only)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await pool.query('SELECT * FROM admins WHERE role = $1', ['admin']);
    res.json(admins.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Update admin (Super admin only)
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role } = req.body;

  try {
    const admin = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    if (admin.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the admin details
    const updatedAdmin = await pool.query(
      'UPDATE admins SET name = $1, email = $2, phone = $3, role = $4 WHERE id = $5 RETURNING *',
      [name, email, phone, role, id]
    );

    res.json(updatedAdmin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete an admin (Super admin only)
const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    if (admin.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await pool.query('DELETE FROM admins WHERE id = $1', [id]);
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
