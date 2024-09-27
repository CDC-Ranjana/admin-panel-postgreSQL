const pool = require('../config/db');

// Create a new activity (Admin and Super admin)
const createActivity = async (req, res) => {
  const { title, description, images, videos } = req.body;
  const adminId = req.user.id; // Get the admin id from the logged-in user

  try {
    const newActivity = await pool.query(
      'INSERT INTO posts (title, description, admin_id, images, videos) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, adminId, images, videos]
    );

    res.status(201).json(newActivity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating activity', error });
  }
};

// Get all activities (Accessible to both Admin and Super admin)
const getAllActivities = async (req, res) => {
  try {
    const activities = await pool.query('SELECT * FROM posts ORDER BY uploaded_time DESC');
    res.status(200).json(activities.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activities', error });
  }
};

// Get a single activity by ID
const getActivityById = async (req, res) => {
  const { id } = req.params;

  try {
    const activity = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (activity.rows.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json(activity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activity', error });
  }
};

// Update an activity (Admin and Super admin)
const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title, description, images, videos } = req.body;
  const adminId = req.user.id; // Get the admin id from the logged-in user

  try {
    const activity = await pool.query('SELECT * FROM posts WHERE id = $1 AND admin_id = $2', [id, adminId]);

    if (activity.rows.length === 0) {
      return res.status(404).json({ message: 'Activity not found or unauthorized to update' });
    }

    const updatedActivity = await pool.query(
      'UPDATE posts SET title = $1, description = $2, images = $3, videos = $4 WHERE id = $5 RETURNING *',
      [title, description, images, videos, id]
    );

    res.status(200).json(updatedActivity.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating activity', error });
  }
};

// Delete an activity (Admin and Super admin)
const deleteActivity = async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id; // Get the admin id from the logged-in user

  try {
    const activity = await pool.query('SELECT * FROM posts WHERE id = $1 AND admin_id = $2', [id, adminId]);

    if (activity.rows.length === 0) {
      return res.status(404).json({ message: 'Activity not found or unauthorized to delete' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting activity', error });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
