const UserModel = require('../models/userModel');
const PetModel = require('../models/petModel');
const JournalModel = require('../models/journalModel');

function showAdminDashboard(req, res) {
  res.render('adminDashboard', { session: req.session });
}

function listUsers(req, res) {
  UserModel.getAllUsers((err, results) => {
    if (err) return res.send('Error loading users');

    res.render('adminUsers', {
      users: results,
      session: req.session
    });
  });
}

function showUserDetails(req, res) {
  const userId = req.params.id;

  UserModel.getUserById(userId, (err, userResults) => {
    if (err || userResults.length === 0) return res.send('User not found');

    PetModel.getPetsByOwnerId(userId, (err2, petResults) => {
      if (err2) return res.send('Error retrieving pet info');

      JournalModel.getJournalEntriesByOwnerId(userId, (err3, journalResults) => {
        if (err3) return res.send('Error retrieving journal entries');

        res.render('adminUserDetails', {
          user: userResults[0],
          pets: petResults,
          journals: journalResults,
          session: req.session
        });
      });
    });
  });
}

function deleteUser(req, res) {
  const userId = req.params.id;

  UserModel.deleteUserById(userId, (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.send('Error deleting user');
    }
    res.redirect('/admin/users');
  });
}

module.exports = {
  showAdminDashboard,
  listUsers,
  showUserDetails,
  deleteUser
};
