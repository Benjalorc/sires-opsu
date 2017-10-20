const mongoose = require('mongoose');
const config = require('../config/database');

//Universidad Schema
const UniversidadSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    municipio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    capacidad:{
        type: Number,
        required: true
    },
    poblacion:{
        type: Number,
        required: true
    },
    carreras:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Carrera",
        required: false
    }]

});

const Universidad = module.exports = mongoose.model('Universidad', UniversidadSchema, 'universidades');

module.exports.registrarUniversidad = function(universidad, callback){
    universidad.save(callback);
}

module.exports.listarUniversidades = function(data, callback){

    const query = {};
    Universidad.find(query)
        .populate("carreras")
        .populate("municipio")
        .exec(callback);
}

module.exports.buscarUniversidad = function(data, callback){

    const query = {codigo: data};
    Universidad.findOne(query)
        .populate("carreras")
        .populate("municipio")
        .exec(callback);
}

module.exports.modificarUniversidad = function(data, callback){
    
    const query = {codigo: data.codigo};
    Universidad.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.incluirCarrera = function(data, callback){
    
    const query = {codigo: data.codigo};
    //Universidad.findOneAndUpdate(query, { $push: data.updatedData}, callback);
    Universidad.findOne(query, callback)
}

module.exports.eliminarUniversidad = function(data, callback){
    
    const query = {codigo: data};
    Universidad.findOneAndRemove(query, callback);
}