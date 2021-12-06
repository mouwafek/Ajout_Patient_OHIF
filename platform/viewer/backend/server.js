//chargement de module
// Importez toutes les dépendances et middleware ici 
//express est un backend framework pour simplifier et manipuler des routes
const express = require('express');
//Mongoose :facilitant les interactions entre base de données et serveur
const mongoose = require('mongoose');
//body-parser est un middleware ( middleware ye5dem fi wost el route : ba3ed el request ou 9bal el response) pour fetcher les donnee du body 
const bodyParser = require('body-parser');
//paasport : pour authentification avec redux (  gérer l’authentification en partant de la création de compte jusqu’à la connexion.)
const passport = require("passport");
//const connectDB = require('./Connection');

//cors partage des ressources entre origines multiples (ki tabda 3andek code 2 version jey men zouz blayes)
const cors = require('cors');
//ki ta3mel submit fel github dotenv yen7i el code eli ma t7eb 7ad ychoufou
//require('dotenv').config();

//On définit notre objet express nommé app

// Lancez une application express. 
const app = express();
app.use(cors());
app.use(express.json());


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  
  // DB Config
  const db = require("./config/keys.js").mongoURI;
  
  // Connect to MongoDB
  mongoose
    .connect(
      db,
      { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex :true}
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
  
  // Passport middleware
 // app.use(passport.initialize());
  
  // Passport config
  //require("./config/passport")(passport);

  //routes
 
 /* const users = require("./routes/api/user");
  app.use("/api/users", users);
*/
// utilise tous les contrôleurs (API) 
const DoctorRouter = require('./routes/Doctor');
app.use('/Doctor', DoctorRouter);
const PatientRouter = require('./routes/Patient');
app.use('/Patient', PatientRouter);

//Définition et mise en place du port d'écoute
// Démarrez le serveur ici 
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
