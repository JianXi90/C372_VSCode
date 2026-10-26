const connection = require('../config/db');

function createPet({ ownerId, pet_name, species, breed, age, petImage }, cb) {
  const sql = 'INSERT INTO pets (owner_id, name, species, breed, age, image) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [ownerId, pet_name, species, breed, age, petImage], cb);
}

function getPetsByOwnerId(userId, cb) {
  const sql = 'SELECT * FROM pets WHERE owner_id = ?';
  connection.query(sql, [userId], cb);
}

module.exports = {
  createPet,
  getPetsByOwnerId
};
