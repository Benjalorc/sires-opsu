const mongoose = require('mongoose');
const config = require('../config/database');

//Universidad Schema
const UniversidadSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    siglas:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    nucleo:{
        type: String,
        required: true
    },
    ubicacion:{
        type: String,
        ref: 'Parroquias',
        required: true
    },
    capacidad:{
        type: Number,
        required: false
    },
    matricula:{
        type: Number,
        default: 0,
        required: true
    },
    servicios:[{
        type: String,
        required: false
    }],
    carreras:[{
        codigo:{
            type: String,
            required: true
        },        
        codigo_int:{
            type: String,
            required: true
        },
        modalidad:{
            type: String,
            required: true
        },
        titulos:[{
            duracion:{
                type: Number,
                required: true
            },
            titulo:{
                type: String,
                required: true
            }
        }]
    }],
    gestion:{
        type: String,
        required: true
    }
});

const Universidad = module.exports = mongoose.model('Universidad', UniversidadSchema, 'universidades');

module.exports.registrarUniversidad = function(universidad, callback){
    universidad.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Universidad.insertMany(documentos, callback);
}

module.exports.getByParr = function(parr, callback){

    let codigo = parr;

    Universidad.aggregate([
        { $lookup: 
            {
            from: 'parroquias',
            localField: 'ubicacion',
            foreignField: 'codigo',
            as: 'ubicacion'
            }
        },
        { $unwind: 
            { 
            path: "$ubicacion", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'municipios',
            localField: 'ubicacion.municipio',
            foreignField: 'codigo',
            as: 'ubicacion.municipio'
            }
        },
        { "$unwind": 
            { 
            path: "$ubicacion.municipio", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        {$match:
            {"ubicacion.codigo": codigo}
        },
        { "$unwind": 
            { 
            path: "$carreras", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'carreras',
            localField: 'carreras.codigo',
            foreignField: 'codigo',
            as: 'carreras.carrera'
            }
        },
        { "$unwind": 
            { 
            path: "$carreras.carrera", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $group:
            {
            "_id": "$_id",
            "codigo": { "$first": "$codigo"},
            "siglas": { "$first": "$siglas"},
            "nombre": { "$first": "$nombre"},
            "nucleo": { "$first": "$nucleo"},
            "ubicacion": { "$first": "$ubicacion"},
            "capacidad": { "$first": "$capacidad"},
            "matricula": { "$first": "$matricula"},
            "gestion": { "$first": "$gestion"},
            "servicios": { "$first": "$servicios"},
            "carreras": { "$push": "$carreras"}
            }
        },
        {$project:
            {
            "_id":0,
            "ubicacion._id":0,
            "ubicacion.municipio._id":0,
            "carreras.carrera._id":0
            }
        },        
        {$project:
            {
            "carreras.codigo":0,
            "carreras.carrera.__v":0
            }
        }
    ]).exec(callback);

}


module.exports.getByMun = function(mun, callback){
    
    let codigo = mun;

    Universidad.aggregate([
        { $lookup: 
            {
            from: 'parroquias',
            localField: 'ubicacion',
            foreignField: 'codigo',
            as: 'ubicacion'
            }
        },
        { $unwind: 
            { 
            path: "$ubicacion", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'municipios',
            localField: 'ubicacion.municipio',
            foreignField: 'codigo',
            as: 'ubicacion.municipio'
            }
        },
        { "$unwind": 
            { 
            path: "$ubicacion.municipio", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        {$match:
            {"ubicacion.municipio.codigo": mun}
        },
        { "$unwind": 
            { 
            path: "$carreras", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'carreras',
            localField: 'carreras.codigo',
            foreignField: 'codigo',
            as: 'carreras.carrera'
            }
        },
        { "$unwind": 
            { 
            path: "$carreras.carrera", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $group:
            {
            "_id": "$_id",
            "codigo": { "$first": "$codigo"},
            "siglas": { "$first": "$siglas"},
            "nombre": { "$first": "$nombre"},
            "nucleo": { "$first": "$nucleo"},
            "ubicacion": { "$first": "$ubicacion"},
            "capacidad": { "$first": "$capacidad"},
            "matricula": { "$first": "$matricula"},
            "gestion": { "$first": "$gestion"},
            "servicios": { "$first": "$servicios"},
            "carreras": { "$push": "$carreras"}
            }
        },
        {$project:
            {
            "_id":0,
            "ubicacion._id":0,
            "ubicacion.municipio._id":0,
            "carreras.carrera._id":0
            }
        },        
        {$project:
            {
            "carreras.codigo":0,
            "carreras.carrera.__v":0
            }
        }
    ]).exec(callback);
}

module.exports.listarUniversidades = function(data, callback){

    Universidad.aggregate([
        { $lookup: 
            {
            from: 'parroquias',
            localField: 'ubicacion',
            foreignField: 'codigo',
            as: 'ubicacion'
            }
        },
        { $unwind: 
            { 
            path: "$ubicacion", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'municipios',
            localField: 'ubicacion.municipio',
            foreignField: 'codigo',
            as: 'ubicacion.municipio'
            }
        },
        { "$unwind": 
            { 
            path: "$ubicacion.municipio", 
            preserveNullAndEmptyArrays: true 
            } 
        },        
        {$match: {"ubicacion.municipio.estado": "18"}},
        {$match: {"carreras": {$ne: []} } },
        { "$unwind": 
            { 
            path: "$carreras", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'carreras',
            localField: 'carreras.codigo',
            foreignField: 'codigo',
            as: 'carreras.carrera'
            }
        },
        { "$unwind": 
            { 
            path: "$carreras.carrera", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $group:
            {
            "_id": "$_id",
            "siglas": { "$first": "$siglas"},
            "nombre": { "$first": "$nombre"},
            "nucleo": { "$first": "$nucleo"},
            "codigo": { "$first": "$codigo"},
            "gestion": { "$first": "$gestion"},
            "ubicacion": { "$first": "$ubicacion"},
            "carreras": { "$push": "$carreras"},
            "capacidad": { "$first": "$capacidad"},
            "matricula": { "$first": "$matricula"},
            "servicios": { "$first": "$servicios"}
            }
        },
        {$project:
            {
            "_id":0,
            "ubicacion._id":0,
            "ubicacion.__v":0,
            "ubicacion.municipio._id":0,
            "ubicacion.municipio.__v":0
            }
        }
    ]).exec(callback);
}

module.exports.verificarUniversidad = function(data, callback){

    Universidad.findOne({codigo: data}, callback);
}

module.exports.buscarUniversidad = function(data, callback){

    Universidad.aggregate([
        {$match:
            {"codigo": data}
        },
        { $lookup: 
            {
            from: 'parroquias',
            localField: 'ubicacion',
            foreignField: 'codigo',
            as: 'ubicacion'
            }
        },
        { $unwind: 
            { 
            path: "$ubicacion", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'municipios',
            localField: 'ubicacion.municipio',
            foreignField: 'codigo',
            as: 'ubicacion.municipio'
            }
        },
        { "$unwind": 
            { 
            path: "$ubicacion.municipio", 
            preserveNullAndEmptyArrays: true 
            } 
        },        
        { $lookup: 
            {
            from: 'estados',
            localField: 'ubicacion.municipio.estado',
            foreignField: 'codigo',
            as: 'ubicacion.municipio.estado'
            }
        },
        { "$unwind": 
            { 
            path: "$ubicacion.municipio.estado", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { "$unwind": 
            { 
            path: "$carreras", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $lookup: 
            {
            from: 'carreras',
            localField: 'carreras.codigo',
            foreignField: 'codigo',
            as: 'carreras.carrera'
            }
        },
        { "$unwind": 
            { 
            path: "$carreras.carrera", 
            preserveNullAndEmptyArrays: true 
            } 
        },
        { $group:
            {
            "_id": "$_id",
            "codigo": { "$first": "$codigo"},
            "siglas": { "$first": "$siglas"},
            "nombre": { "$first": "$nombre"},
            "nucleo": { "$first": "$nucleo"},
            "ubicacion": { "$first": "$ubicacion"},
            "capacidad": { "$first": "$capacidad"},
            "matricula": { "$first": "$matricula"},
            "gestion": { "$first": "$gestion"},
            "servicios": { "$first": "$servicios"},
            "carreras": { "$push": "$carreras"}
            }
        },
        {$project:
            {
            "_id":0,
            "ubicacion._id":0,
            "ubicacion.municipio._id":0,
            "ubicacion.municipio.estado._id":0,
            "carreras.carrera._id":0
            }
        },        
        {$project:
            {
            "carreras.codigo":0,
            "carreras.carrera.__v":0
            }
        }
    ]).exec(callback);

}

module.exports.actualizarCarreras = function(data, callback){

    const query = {codigo: data};
    Universidad.findOne(query, callback);
}

module.exports.actualizarUniversidad = function(data, callback){
    
    Universidad.findOneAndUpdate({codigo: data.codigo}, { $set: data.updatedData}, callback);
}


module.exports.verificarCarrera = function(data, callback){

    const query = {codigo: data.codigo, carreras: data.carrera};
    Universidad.findOne(query, callback);
}

module.exports.incluirCarrera = function(data, callback){
    
    const query = {codigo: data.codigo};
    Universidad.findOneAndUpdate(query, { $push: {carreras: data.carrera}}, {new: true}, callback);
    //Universidad.findOne(query, callback)
}

module.exports.eliminarUniversidad = function(data, callback){
    
    const query = {codigo: data};
    Universidad.findOneAndRemove(query, callback);
}