const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Doctor = require('../models/Doctor.model');
const keys = require("../config/keys");
//Il fait un excellent travail briser la façon dont la stratégie d'authentification
// JWT est construite, ce qui explique les paramètres requis, des variables
// et des fonctions telles que options, secretOrKey, jwtFromRequest, 
//verifyet jwt_payload.


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Doctor.findById(jwt_payload.id)
        .then(doctor => {
          if (doctor) {
            return done(null, doctor);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
