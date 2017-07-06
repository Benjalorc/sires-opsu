const mongoose = require('mongoose');
const config = require('../config/database');

//Carrera Schema
const CarreraSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    especialidad:{
        type: String,
        required: true
    },
    area:{
        type: String,
        required: true
    },
    duracion:{
        type: Number,
        required: true
    },
    modalidad:{
        type: String,
        required: true
    }
});

const Carrera = module.exports = mongoose.model('Carrera', CarreraSchema);

module.exports.agregarCarrera = function(carrera, callback){
    carrera.save(callback);
}

module.exports.buscarCarrera = function(data, callback){

    const query = {codigo: data};
    Carrera.findOne(query, callback);
}

module.exports.listarCarreras = function(data, callback){

    const query = {};
    Carrera.find(query, callback);
}

module.exports.actualizarCarrera = function(data, callback){
    
    const query = {codigo: data.codigo};
    Carrera.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarCarrera = function(data, callback){
    
    const query = {codigo: data};
    Carrera.findOneAndRemove(query, callback);
}