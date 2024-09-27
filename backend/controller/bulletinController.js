const pool = require('../config/db');

// Create a new bulletin (Super admin only)
const createBulletin = async (req, res) => {
  const { title, description, image } = req.body;
  const superAdminId = req.user.id; // Get the super admin id from the logged-in user

  try {
    const newBulletin = await pool.query(
      'INSERT INTO bulletins (title, description, image, super_admin_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, image, superAdminId]
    );

    res.status(201).json(newBulletin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating bulletin', error });
  }
};

// Get all bulletins (Accessible to both admins and super admin)
const getAllBulletins = async (req, res) => {
  try {
    const bulletins = await pool.query('SELECT * FROM bulletins ORDER BY created_at DESC');
    res.status(200).json(bulletins.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bulletins', error });
  }
};

// Get a single bulletin by ID
const getBulletinById = async (req, res) => {
  const { id } = req.params;

  try {
    const bulletin = await pool.query('SELECT * FROM bulletins WHERE id = $1', [id]);

    if (bulletin.rows.length === 0) {
      return res.status(404).json({ message: 'Bulletin not found' });
    }

    res.status(200).json(bulletin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bulletin', error });
  }
};

// Update a bulletin (Super admin only)
const updateBulletin = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  const superAdminId = req.user.id; // Get the super admin id from the logged-in user

  try {
    const bulletin = await pool.query('SELECT * FROM bulletins WHERE id = $1 AND super_admin_id = $2', [id, superAdminId]);

    if (bulletin.rows.length === 0) {
      return res.status(404).json({ message: 'Bulletin not found or unauthorized to update' });
    }

    const updatedBulletin = await pool.query(
      'UPDATE bulletins SET title = $1, description = $2, image = $3 WHERE id = $4 RETURNING *',
      [title, description, image, id]
    );

    res.status(200).json(updatedBulletin.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating bulletin', error });
  }
};

// Delete a bulletin (Super admin only)
const deleteBulletin = async (req, res) => {
  const { id } = req.params;
  const superAdminId = req.user.id; // Get the super admin id from the logged-in user

  try {
    const bulletin = await pool.query('SELECT * FROM bulletins WHERE id = $1 AND super_admin_id = $2', [id, superAdminId]);

    if (bulletin.rows.length === 0) {
      return res.status(404).json({ message: 'Bulletin not found or unauthorized to delete' });
    }

    await pool.query('DELETE FROM bulletins WHERE id = $1', [id]);
    res.status(200).json({ message: 'Bulletin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting bulletin', error });
  }
};

module.exports = {
  createBulletin,
  getAllBulletins,
  getBulletinById,
  updateBulletin,
  deleteBulletin,
};
