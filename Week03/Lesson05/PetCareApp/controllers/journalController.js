const JournalModel = require('../models/journalModel');
const PetModel = require('../models/petModel');

function listJournals(req, res) {
  const userId = req.session.user.id;
  let selectedPetId = req.query.petId;

  PetModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');

    if (!selectedPetId && pets.length > 0) {
      selectedPetId = pets[0].id;
    }

    if (!selectedPetId) {
      return res.render('journals', {
        journals: [],
        pets,
        selectedPetId: '',
        pet: null,
        session: req.session
      });
    }

    JournalModel.getJournalsForOwnerAndPet(userId, selectedPetId, (err2, journals) => {
      if (err2) return res.send('Error loading journals');

      const petInfo = pets.find((p) => p.id == selectedPetId);

      return res.render('journals', {
        journals,
        pets,
        selectedPetId,
        pet: petInfo,
        session: req.session
      });
    });
  });
}

function showNewJournalForm(req, res) {
  const userId = req.session.user.id;
  const selectedPetId = req.query.petId;

  JournalModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');
    res.render('newJournal', { pets, session: req.session, selectedPetId });
  });
}

function createJournal(req, res) {
  const { pet_id, activity, notes, entry_date } = req.body;

  JournalModel.createJournal({ pet_id, activity, notes, entry_date }, (err) => {
    if (err) return res.send('Error saving journal');
    res.redirect(`/journals?petId=${pet_id}`);
  });
}

function showEditJournalForm(req, res) {
  const journalId = req.params.id;
  const userId = req.session.user.id;

  JournalModel.getJournalById(journalId, (err, journalResults) => {
    if (err || journalResults.length === 0) return res.send('Journal not found');

    JournalModel.getPetsByOwnerId(userId, (err2, pets) => {
      if (err2) return res.send('Error fetching pets');
      res.render('editJournal', { journal: journalResults[0], pets, session: req.session });
    });
  });
}

function updateJournal(req, res) {
  const { entry_date, activity, notes, pet_id } = req.body;
  const journalId = req.params.id;

  JournalModel.updateJournal({ entry_date, activity, notes, pet_id, journalId }, (err) => {
    if (err) return res.send('Error updating journal');
    res.redirect(`/journals?petId=${pet_id}`);
  });
}

function deleteJournal(req, res) {
  const journalId = req.params.id;

  JournalModel.getPetIdByJournalId(journalId, (err, result) => {
    if (err || result.length === 0) return res.send('Journal not found.');

    const petId = result[0].pet_id;

    JournalModel.deleteJournalById(journalId, (err2) => {
      if (err2) return res.send('Error deleting journal.');
      res.redirect(`/journals?petId=${petId}`);
    });
  });
}

function searchJournals(req, res) {
  const userId = req.session.user.id;
  const searchQuery = `%${req.query.q}%`;
  const selectedPetId = req.query.petId;

  PetModel.getPetsByOwnerId(userId, (err, pets) => {
    if (err) return res.send('Error loading pets');

    JournalModel.getJournalsForSearch({ userId, searchQuery, selectedPetId }, (err2, journals) => {
      if (err2) return res.send('Error searching journals');

      let pet = null;
      if (selectedPetId) {
        const found = pets.find((p) => p.id.toString() === selectedPetId);
        if (found) pet = found;
      }

      res.render('journals', {
        journals,
        pets,
        selectedPetId,
        pet,
        session: req.session
      });
    });
  });
}

module.exports = {
  listJournals,
  showNewJournalForm,
  createJournal,
  showEditJournalForm,
  updateJournal,
  deleteJournal,
  searchJournals
};
