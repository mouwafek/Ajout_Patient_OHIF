const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//cree schema
const PatientSchema = new Schema(
  {
    nom: {
      type: String,
      match: /^[a-zA-Z0-9- _]+$/,
      required: true,
    },
    prenom: {
      type: String,
      match: /^[a-zA-Z0-9- _]+$/,
      required: true,
    },
    genre: {
      type: String,
      match: /^[a-zA-Z0-9-_]+$/,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;