const mongoose = require('mongoose');
const config = require('../config/database');

//Carrera Schema
const MunicipioSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },    
    estado:{
        type: String,
        ref: 'Estado',
        required: true
    },
    nombre:{
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
    },
    potencialidades:[{
        type: String,
        required: false,
        default: ''
    }]
});

const Municipio = module.exports = mongoose.model('Municipio', MunicipioSchema);

module.exports.registrarMunicipio = function(municipio, callback){
    municipio.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Municipio.insertMany(documentos, callback);
}

module.exports.obtenerMunicipios = function(data, callback){

    const query = {};
    Municipio.find(query, callback);
/*
    Municipio.aggregate([
        { $lookup: 
            {
            from: "estados", 
            localField: "estado", 
            foreignField: "codigo",
            as: "estado"
            } 
        }
    ]).exec(callback);
*/
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