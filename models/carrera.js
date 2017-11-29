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
    area:{
        type: String,
        required: true
    },
    especialidad:{
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    }
});

const Carrera = module.exports = mongoose.model('Carrera', CarreraSchema);

module.exports.agregarCarrera = function(carrera, callback){
    carrera.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Carrera.insertMany(documentos, callback);
}

module.exports.buscarCarrera = function(query, callback){

    Carrera.findOne(query, callback);
}

module.exports.listarCarreras = function(data, callback){

    Carrera.find({}, callback);
}

module.exports.agruparCarrerasArea = function(data, callback){

    Carrera.aggregate([
        { $group : 
            { 
            _id : "$area", 
            carreras: { $push: "$$ROOT" } 
            } 
        }
    ]).exec(callback);
}

module.exports.buscarCarrerasPorEspecialidad = function(data, callback){

    Carrera.find({especialidad: data}, callback);
}

module.exports.agruparCarrerasEspecialidad = function(data, callback){

    Carrera.aggregate([
        { $group : 
            { 
            _id : "$especialidad", 
            carreras: { $push: "$$ROOT" } 
            } 
        }
    ]).exec(callback);
}

module.exports.actualizarCarrera = function(data, callback){
    
    const query = {codigo: data.codigo};
    Carrera.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarCarrera = function(data, callback){
    
    const query = {codigo: data};
    Carrera.findOneAndRemove(query, callback);
}