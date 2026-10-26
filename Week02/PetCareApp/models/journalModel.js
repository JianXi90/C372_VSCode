const connection = require('../config/db');

function getJournalsForOwnerAndPet(userId, selectedPetId, cb) {
  const sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND pets.id = ?
  `;
  connection.query(sql, [userId, selectedPetId], cb);
}

function getJournalsForSearch({ userId, searchQuery, selectedPetId }, cb) {
  let sql = `
    SELECT journal.*, pets.name, pets.species, pets.breed, pets.age, pets.image 
    FROM journal 
    JOIN pets ON journal.pet_id = pets.id 
    WHERE pets.owner_id = ? AND (journal.activity LIKE ? OR journal.notes LIKE ?)
  `;

  const params = [userId, searchQuery, searchQuery];

  if (selectedPetId) {
    sql += ' AND pets.id = ?';
    params.push(selectedPetId);
  }

  connection.query(sql, params, cb);
}

function getJournalEntriesByOwnerId(userId, cb) {
  const sql = `
    SELECT journal.*, pets.id AS pet_id
    FROM journal
    JOIN pets ON journal.pet_id = pets.id
    WHERE pets.owner_id = ?
  `;
  connection.query(sql, [userId], cb);
}

function createJournal({ pet_id, activity, notes, entry_date }, cb) {
  const sql = 'INSERT INTO journal (pet_id, activity, notes, entry_date) VALUES (?, ?, ?, ?)';
  connection.query(sql, [pet_id, activity, notes, entry_date], cb);
}

function getJournalById(journalId, cb) {
  const sql = 'SELECT * FROM journal WHERE id = ?';
  connection.query(sql, [journalId], cb);
}

function getPetsByOwnerId(userId, cb) {
  const sql = 'SELECT * FROM pets WHERE owner_id = ?';
  connection.query(sql, [userId], cb);
}

function updateJournal({ entry_date, activity, notes, pet_id, journalId }, cb) {
  const sql = 'UPDATE journal SET entry_date = ?, activity = ?, notes = ?, pet_id = ? WHERE id = ?';
  connection.query(sql, [entry_date, activity, notes, pet_id, journalId], cb);
}

function getPetIdByJournalId(journalId, cb) {
  const sql = 'SELECT pet_id FROM journal WHERE id = ?';
  connection.query(sql, [journalId], cb);
}

function deleteJournalById(journalId, cb) {
  const sql = 'DELETE FROM journal WHERE id = ?';
  connection.query(sql, [journalId], cb);
}

module.exports = {
  getJournalsForOwnerAndPet,
  getJournalsForSearch,
  getJournalEntriesByOwnerId,
  createJournal,
  getJournalById,
  getPetsByOwnerId,
  updateJournal,
  getPetIdByJournalId,
  deleteJournalById
};
