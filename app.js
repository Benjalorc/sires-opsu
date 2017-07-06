const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config/database');

const app = express();

const users = require('./routes/users');
const municipios = require('./routes/municipios');
const estudiantes = require('./routes/estudiantes');
const carreras = require('./routes/carreras');
const universidades = require('./routes/universidades');
const snis = require('./routes/snis');
const pnevs = require('./routes/pnevs');

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

//Respondera al llamar a /*routes*/xxxxxx
app.use('/users', users);
app.use('/municipios', municipios);
app.use('/estudiantes', estudiantes);
app.use('/carreras', carreras);
app.use('/universidades', universidades);
app.use('/snis', snis);
app.use('/pnevs', pnevs);

//STATIC FOLDER
app.use(express.static(path.join(__dirname, 'client')));

//INDEX ROUTE
app.get('/', (req, res) => {
    res.send("Hola a todos!");
});

app.get('/scripts/mapController.js', (req, res) => {
    res.download('./scripts/mapController.js');
});

app.get('/scripts/divisionTerritorial.js', (req, res) => {
    res.download('./scripts/divisionTerritorial.js');
});

app.get('/scripts/leafLet/leaflet.js', (req, res) => {
    res.download('./scripts/leaflet/leaflet.js');
});



//START SERVER
app.listen(port, () => {
    
    console.log("Servidor iniciado en el puerto "+port);
});