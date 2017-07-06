const mongoose = require('mongoose');
const config = require('../config/database');

//Carrera Schema
const MunicipioSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    poblacion:{
        type: Number,
        min: 1,
        required: true
    },
    superficie:{
        type: Number,
        min: 1,
        required: true
    }
});

const Municipio = module.exports = mongoose.model('Municipio', MunicipioSchema);

module.exports.registrarMunicipio = function(municipio, callback){
    municipio.save(callback);
}

module.exports.buscarMunicipio = function(data, callback){

    const query = {codigo: data};
    Municipio.findOne(query, callback);
}

module.exports.actualizarMunicipio = function(data, callback){
    
    const query = {codigo: data.codigo};
    Municipio.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarMunicipio = function(data, callback){
    
    const query = {codigo: data};
    Municipio.findOneAndRemove(query, callback);
}