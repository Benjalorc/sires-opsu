const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

const users = require('./routes/users');

//PORT NUMBER
const port = process.env.PORT;


//CONNECT TO DATABASE
mongoose.connect(config.database);

//ON CONNECTION
mongoose.connection.on('connected', () => {
   
   console.log('Conectado a la base de datos mongodb: '+config.database);
});

//ON ERROR
mongoose.connection.on('error', (err) => {
   
   console.log('Database error: '+err);
});

//CORS MIDDLEWARE
app.use(cors());

//BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//Respondera al llamar a /users/xxxxxx
app.use('/users', users);

//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'client')));

//INDEX ROUTE
app.get('/', (req, res) => {
    res.send("Hola a todos!");
});


//START SERVER
app.listen(port, () => {
    
    console.log("Servidor iniciado en el puerto "+port);
});