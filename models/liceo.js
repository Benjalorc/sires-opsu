const mongoose = require('mongoose');
const config = require('../config/database');

//Liceo Schema
const LiceoSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    }, 
    tipo:{
        type: String,
        required: true
    },
    parroquia:{
        type: String,
        ref: 'Parroquia',
        required: true
    },
    menciones:[{type: String, required: false}]
    
});

const Liceo = module.exports = mongoose.model('Liceo', LiceoSchema, 'liceos');

module.exports.registrarLiceo = function(liceo, callback){
    liceo.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Liceo.insertMany(documentos, callback);
}

module.exports.listarLiceos = function(data, callback){

    Liceo.aggregate([    
        { $lookup: 
            {
            from:"parroquias", 
            localField:"parroquia", 
            foreignField:"_id",
            as:"parroquia"
            }
        },
        { $project: 
            {
            _id:0,
            "parroquia._id":0
            }
        }
    ]).exec(callback);
}

module.exports.verificarLiceo = function(data, callback){

    const query = {codigo: data};
    Liceo.findOne(query, callback);

}

module.exports.buscarLiceo = function(data, callback){

    Liceo.findOne({codigo: data}, callback)
}

module.exports.modificarLiceo = function(data, callback){
    
    const query = {codigo: data.codigo};
    Liceo.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarLiceo = function(data, callback){
    
    const query = {codigo: data};
    Liceo.findOneAndRemove(query, callback);
}