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
const estados = require('./routes/estados');
const municipios = require('./routes/municipios');
const parroquias = require('./routes/parroquias');
const estudiantes = require('./routes/estudiantes');
//const estopsu = require('./routes/estopsu');
const carreras = require('./routes/carreras');
const universidades = require('./routes/universidades');
const ofertaunivs = require('./routes/ofertaunivs');
const liceos = require('./routes/liceos');
const ofertaliceos = require('./routes/ofertaliceos');
const indicadores = require('./routes/indicadores');
const snis = require('./routes/snis');
//const sniopsu = require('./routes/sniopsu');
const pnevs = require('./routes/pnevs');

//PORT NUMBER
const port = 8080;

//CONNECT TO DATABASE
mongoose.connect(config.database, {useMongoClient: true}, (err)=>{
    if(err){
        console.log("La cagaste pendejo"); 
        throw err;
        }
    else{console.log("Todo va bien!");}
});

//ON CONNECTION
mongoose.connection.on('connected', () => {
   
   console.log('Conectado a la base de datos mongodb: '+config.database);
});

//ON ERROR
mongoose.connection.on('error', (err) => {
   
   console.log('Database error: '+err);
   throw err;
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
app.use('/estados', estados);
app.use('/municipios', municipios);
app.use('/parroquias', parroquias);
app.use('/estudiantes', estudiantes);
//app.use('/estopsu', estopsu);
app.use('/carreras', carreras);
app.use('/universidades', universidades);
app.use('/ofertaunivs', ofertaunivs);
app.use('/liceos', liceos);
app.use('/ofertaliceos', ofertaliceos);
app.use('/indicadores', indicadores);
app.use('/snis', snis);
//app.use('/sniopsu', sniopsu);
app.use('/pnevs', pnevs);

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