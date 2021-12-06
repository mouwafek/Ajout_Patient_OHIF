const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  //validatorne fonctionne qu'avec des chaînes)
  data.nom = !isEmpty(data.nom) ? data.nom : "";
  data.prenom = !isEmpty(data.prenom) ? data.prenom : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.tel = !isEmpty(data.tel) ? data.tel: "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.nomentreprise = !isEmpty(data.nomentreprise) ? data.nomentreprise : "";
  data.pays = !isEmpty(data.pays) ? data.pays: "";
  data.activite = !isEmpty(data.activite) ? data.activite: "";
  data.region = !isEmpty(data.region) ? data.region: "";
  data.devises = !isEmpty(data.devises) ? data.devises: "";
  data.codepostal = !isEmpty(data.codepostal) ? data.codepostal: "";


//Vérifiez les champs vides, les formats de courrier électronique valides, les exigences de mot de 
//passe et confirmez l'égalité des mots de passe à l'aide des validatorfonctions

  // Name checks
  if (Validator.isEmpty(data.nom)) {
    errors.nom = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
