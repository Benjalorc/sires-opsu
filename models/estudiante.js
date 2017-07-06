const mongoose = require('mongoose');
const config = require('../config/database');
const Municipio = require('./municipio');



//Carrera Schema
const EstudianteSchema = mongoose.Schema({
    
    cedula:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    f_nac:{
        type: Date,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    mun:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Municipio",
        required: true
    }

    
});

const Estudiante = module.exports = mongoose.model('Estudiante', EstudianteSchema);

module.exports.registrarEstudiante = function(estudiante, callback){
    estudiante.save(callback);
}

module.exports.buscarEstudiante = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOne(query, callback);
}

module.exports.buscarEstudianteCompleto = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOne(query)
        .populate("mun")
        .exec(callback);
}

module.exports.actualizarEstudiante = function(data, callback){
    
    const query = {cedula: data.cedula};
    Estudiante.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarEstudiante = function(data, callback){
    
    const query = {cedula: data};
    Estudiante.findOneAndRemove(query, callback);
}