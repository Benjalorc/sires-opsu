const mongoose = require('mongoose');
const config = require('../config/database');
const Parroquia = require('./parroquia');


const EstudianteSchema = mongoose.Schema({
    
    cedula:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    f_nac:{
        type: Date,
        required: true
    },
    liceo:{
        type: String,
        ref: "Liceo",
        required: true
    },
    mencion:{
        type: String,
        required: true
    },
    ano_egreso:{
        type: Number,
        required: true
    },
    residencia:{
        type: String,
        ref: "Parroquia",
        required: true
    }

});

const Estudiante = module.exports = mongoose.model('Estudiante', EstudianteSchema);

module.exports.registrarEstudiante = function(estudiante, callback){
    estudiante.save(callback);
}

module.exports.buscarEstudiante = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOne(query, callback);
}

module.exports.buscarEstudianteCompleto = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOne(query)
        .populate("residencia")    
        .exec(callback);
}

module.exports.getAllStudents = function(data, callback){

        console.log(data);
        let ano = data.ano;
        let mun = data.mun;

        console.log(ano);
        console.log(mun);

        Estudiante.aggregate([
            {$match: {"ano_egreso":ano} },
            { $group : 
                {
                _id : "$residencia", 
                total : { $sum : 1 }
                } 
            },
            {$lookup:
                {
                from: 'parroquias',
                localField: '_id',
                foreignField: 'codigo',
                as: '_id'
                }
            },
            { "$unwind": 
                { 
                path: "$_id", 
                preserveNullAndEmptyArrays: true 
                } 
            },
            {$lookup:
                {
                from: 'municipios',
                localField: '_id.municipio',
                foreignField: 'codigo',
                as: '_id.municipio'
                }
            },
            { "$unwind": 
                { 
                path: "$_id.municipio", 
                preserveNullAndEmptyArrays: true 
                } 
            },
            {$match: {"_id.municipio.estado":mun} },
            {$project:
                {
                "_id._id":0,
                "_id.__v":0,
                "_id.municipio._id":0,
                "_id.municipio.__v":0
                }
            },
            {$project:
                {
                "municipio":"$_id.municipio.nombre",
                "total":1,
                "_id":0
                }
            },
            {$group:
                {
                "_id":"$municipio",
                "resultado": {"$sum":"$total"}
                }
            }
        ]).exec(callback);
}

module.exports.actualizarEstudiante = function(data, callback){

    const query = {cedula: data.cedula};
    Estudiante.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarEstudiante = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOneAndRemove(query, callback);
}