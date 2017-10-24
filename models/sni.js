const mongoose = require('mongoose');
const config = require('../config/database');

//SNI Schema
const SniSchema = mongoose.Schema({
    
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
    opciones:{
        a: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
        b: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
        c: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: true},
        d: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: false},
        e: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: false},
        f: {type: mongoose.Schema.Types.ObjectId, ref: "Carrera", required: false}
    }
});

const Sni = module.exports = mongoose.model('Sni', SniSchema);

module.exports.agregarSni = function(sni, callback){
    sni.save(callback);
}


module.exports.obtenerSnis = function(data, callback){

    const query = {};
    Sni.find(query)
        .populate("estudiante")
        .populate("opciones.a")
        .populate("opciones.b")
        .populate("opciones.c")
        .exec(callback);
}


module.exports.buscarSni = function(query, callback){

    Sni.findOne(query)
        .populate("estudiante")
        .populate("opciones.a")
        .populate("opciones.b")
        .populate("opciones.c")
        .populate("opciones.d")
        .populate("opciones.e")
        .populate("opciones.f")
        .exec(callback);
}

module.exports.actualizarSni = function(data, callback){
    
    const query = {cedula: data.cedula};
    Sni.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarSni = function(data, callback){
    
    const query = {cedula: data};
    Sni.findOneAndRemove(query, callback);
}