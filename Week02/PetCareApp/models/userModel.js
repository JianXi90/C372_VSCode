const connection = require('../config/db');

function createUser({ username, password, name, role }, cb) {
  const sql = 'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)';
  connection.query(sql, [username, password, name, role], cb);
}

function findUserByUsernameAndPassword(username, hashedPassword, cb) {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, hashedPassword], cb);
}

function getAllUsers(cb) {
  const sql = 'SELECT id, name, username, role FROM users';
  connection.query(sql, cb);
}

function getUserById(userId, cb) {
  const sql = 'SELECT id, name, username, role FROM users WHERE id = ?';
  connection.query(sql, [userId], cb);
}

function deleteUserById(userId, cb) {
  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [userId], cb);
}

module.exports = {
  createUser,
  findUserByUsernameAndPassword,
  getAllUsers,
  getUserById,
  deleteUserById
};
