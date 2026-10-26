const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/admin/dashboard', isAdmin, adminController.showAdminDashboard);
router.get('/admin/users', isAdmin, adminController.listUsers);
router.get('/admin/users/:id', isAdmin, adminController.showUserDetails);
router.get('/admin/users/delete/:id', isAdmin, adminController.deleteUser);

module.exports = router;
