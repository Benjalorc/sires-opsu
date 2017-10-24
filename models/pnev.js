const mongoose = require('mongoose');
const config = require('../config/database');

//PNEV Schema
const PnevSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    ano:{
        type: String,
        required: true
    },
    estudiante:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Estudiante",
        required: true
    },
    resultados:{
        a: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
        b: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
        c: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true}
    }
});

const Pnev = module.exports = mongoose.model('Pnev', PnevSchema);

module.exports.agregarPnev = function(pnev, callback){
    pnev.save(callback);
}

module.exports.buscarPnev = function(query, callback){

    Pnev.findOne(query)
        .populate("estudiante")
        .populate("estudiante.mun")
        .populate("resultados.a")
        .populate("resultados.b")
        .populate("resultados.c")
        .exec(callback);
}

module.exports.obtenerPnevs = function(data, callback){

    const query = {};
    Pnev.find(query)
        .populate("estudiante")
        .populate("resultados.a")
        .populate("resultados.b")
        .populate("resultados.c")
        .exec(callback);
}

module.exports.corregirPnev = function(data, callback){
    
    const query = {cedula: data.cedula};
    Pnev.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarPnev = function(data, callback){
    
    const query = {cedula: data};
    Pnev.findOneAndRemove(query, callback);
}