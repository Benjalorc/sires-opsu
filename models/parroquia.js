const mongoose = require('mongoose');
const config = require('../config/database');

//Carrera Schema
const ParroquiaSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    municipio:{
        type: String,
        ref: 'Municipio',
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
    }
});

const Parroquia = module.exports = mongoose.model('Parroquia', ParroquiaSchema);

module.exports.registrarParroquia = function(parroquia, callback){
    parroquia.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Parroquia.insertMany(documentos, callback);
}

module.exports.obtenerParroquias = function(data, callback){

    Parroquia.find({}, callback);

/*
    Parroquia.aggregate([
        { $lookup:
            {
            from: "municipios",
            localField: "municipio",
            foreignField: "codigo",
            as: "municipio"
            }
        },
        { "$unwind": 
            { path: "$municipio", preserveNullAndEmptyArrays: true } 
        },
        { $lookup:
            {
            from: "estados",
            localField: "municipio.estado",
            foreignField: "codigo",
            as: "municipio.estado"
            }
        },
        { "$unwind": 
            { path: "$municipio.estado", preserveNullAndEmptyArrays: true } 
        },
        { $project:
            {
            "_id":0,
            "municipio._id":0,
            "municipio.estado._id":0
            }
        },
        { $group : { _id : "$municipio.codigo", parroquias: { $push: "$$ROOT" } } },
        { "$unwind": 
            { path: "$parroquias", preserveNullAndEmptyArrays: true } 
        },
        { $project:
            {
            "_id":0
            }
        },
        { $group : { _id : "$parroquias.municipio.estado", municipios: { $push: "$$ROOT" } } }
    ]).exec(callback);
    */
}

module.exports.buscarParroquia = function(query, callback){

    Parroquia.findOne(query, callback);
}

module.exports.actualizarParroquia = function(data, callback){
    
    const query = {codigo: data.codigo};
    Parroquia.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarParroquia = function(data, callback){
    
    const query = {codigo: data};
    Parroquia.findOneAndRemove(query, callback);
}