const express = require('express');
const { registerAdmin, loginAdmin, getAllAdmins, updateAdmin, deleteAdmin, } = require('../controllers/adminController');
const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity, } = require('../controller/activityController');
const { createBulletin, getAllBulletins, getBulletinById, updateBulletin, deleteBulletin, } = require('../controllers/bulletinController');

const router = express.Router();


// ! ADMIN ROUTES --------------------------------

// Register admin (Super admin only)
router.post('/register', registerAdmin);

// Login admin
router.post('/login', loginAdmin);

// Get all admins (Super admin only)
router.get('/get-all-admin', getAllAdmins);

// Edit an admin (Super admin only)
router.put('/update-admin/:id', updateAdmin);

// Delete an admin (Super admin only)
router.delete('/delete-admin/:id', deleteAdmin);



// ! ACTIVITY ROUTES --------------------------------
// Create an activity (Admin and Super admin)
router.post('/post-activity', createActivity);

// Get all activities (Admin and Super admin)
router.get('/get-all-activity', getAllActivities);

// Get a single activity by ID (Admin and Super admin)
router.get('/get-activity-post/:id', getActivityById);

// Update an activity (Admin and Super admin)
router.put('/update-activity/:id', updateActivity);

// Delete an activity (Admin and Super admin)
router.delete('/delete-activity/:id', deleteActivity);


// ! Bulletine ROUTES --------------------------------



// Create a bulletin (Super admin only)
router.post('/create-bulletine', createBulletin);

// Get all bulletins (Admins and Super Admin)
router.get('/get-all-bulletine', getAllBulletins);

// Get a single bulletin by ID (Admins and Super Admin)
router.get('/get-bulletin/:id', getBulletinById);

// Update a bulletin (Super admin only)
router.put('/update-bulletine/:id', updateBulletin);

// Delete a bulletin (Super admin only)
router.delete('/delete-bulletine/:id', deleteBulletin);


module.exports = router;
