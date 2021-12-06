const express = require('express');
const router = express.Router();
// Load User model
const Patient = require('../models/Patient.Model');
// @route POST api/users/register
// @desc Register user
// @access Public
//select tous les commercants "get http://localhost:3001/Patient/"
router.route('/').get((req, res) => {
  Patient.find()
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ajouter').post((req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const genre = req.body.genre;
  const date = req.body.date;

  const PatientModel = new Patient({
    nom,
    prenom,
    genre,
    date,
  });
  PatientModel.save()
    .then(() => res.json('Patient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
