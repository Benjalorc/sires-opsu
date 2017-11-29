const mongoose = require('mongoose');
const config = require('../config/database');

//Carrera Schema
const EstadoSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    estandar:{
        type: String,
        required: true
    },
    poblacion:{
        type: Number,
        min: 1,
        required: false
    },
    superficie:{
        type: Number,
        min: 1,
        required: false
    }
});

const Estado = module.exports = mongoose.model('Estado', EstadoSchema);

module.exports.registrarEstado = function(estado, callback){
    estado.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Estado.insertMany(documentos, callback);
}

module.exports.obtenerEstados = function(data, callback){

    const query = {};
    Estado.find(query, callback);
}

module.exports.buscarEstado = function(data, callback){

    const query = {codigo: data};
    Estado.findOne(query, callback);
}

module.exports.actualizarEstado = function(data, callback){
    
    const query = {codigo: data.codigo};
    Estado.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarEstado = function(data, callback){
    
    const query = {codigo: data};
    Estado.findOneAndRemove(query, callback);
}