const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const Doctor = require("../models/Doctor.model");
// @route POST api/users/register
// @desc Register user
// @access Public
//select tous les commercants "get http://localhost:3001/Doctor/"
router.route('/').get((req, res) => {
    Doctor.find()
    .then(Doctor => res.json(Doctor))
    .catch(err => res.status(400).json('Error: ' + err));
}); 
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Doctor.findOne({ email: req.body.email }).then(doctor => {
    if (doctor) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newDoctor = new Doctor({
      nom : req.body.nom,
      prenom : req.body.prenom,
      tel : Number(req.body.tel),
      email : req.body.email,
      password : req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newDoctor.password, salt, (err, hash) => {
          if (err) throw err;
          newDoctor.password = hash;
          newDoctor
            .save()
            .then(() => res.json("Doctor added!"))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Doctor.findOne({ email : req.body.email }).then(doctor => {
    // Check if user exists
    if (!doctor) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(req.body.password, doctor.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
            id: doctor.id,
            nom: doctor.nom,
            prenom: doctor.prenom,
            email: doctor.email,
            tel:doctor.tel,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              user: {
                _id: doctor._id ,
                nom: doctor.nom,
                prenom: doctor.prenom,
                email: doctor.email,
                tel:doctor.tel,
              },
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});
module.exports = router;