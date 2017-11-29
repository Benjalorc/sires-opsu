const mongoose = require('mongoose');
const config = require('../config/database');

//SNI Schema
const SniSchema = mongoose.Schema({
    
    codigo:{
        type: String,
        required: true
    },
    ano:{
        type: Number,
        required: true
    },
    periodo:{
        type: Number,
        required: true
    },
    estudiante:{
        type: String,
        ref: "Estudiante",
        required: true
    },
    opciones:[{
        carrera: {
            type: String, 
            ref: "Carrera", 
            required: true
        },
        universidad: {
            type: String, 
            ref: "Universidad", 
            required: true   
        },
        asignada: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
    asignada:{
        type: Number,
        required: true,
        default: 0
    }
});

const Sni = module.exports = mongoose.model('Sni', SniSchema);

module.exports.agregarSni = function(sni, callback){
    sni.save(callback);
}


module.exports.obtenerSnis = function(data, callback){

Sni.aggregate([
    {$match: { asignada: {$ne: 0}, ano: 2011 } },
    {$project:
            {
            codigo:1,
            items:{
                $filter:{
                    input:"$opciones",
                    as:"item",
                    cond:{$eq:["$$item.universidad","553"]}
                }
            }
        }
    },
    {$match:{ "items":{$ne: [] } }}
]).exec(callback);

}


module.exports.obtenerAsignaciones = function(data, callback){

let univ = data.univ;
let carr = data.carr;

let anoG = parseInt(data.ano);
let anoP = parseInt(data.ano)-3;
console.log(data);

Sni.aggregate([
    {$match: { asignada: {$ne: 0}, ano:{$gte: anoP, $lte: anoG } } },
    {$project:
        {
            codigo:1,
            asignaciones:{
                $filter:{
                    input:"$opciones",
                    as:"asignacion",
                    cond:{ $and: [{$eq:["$$asignacion.universidad",univ]},{$eq:["$$asignacion.asignada",true]}]}
                }
            },
            ano:1,
            periodo:1
        }
    },
    {$match:{ "asignaciones":{$ne: [] } }},
    { "$unwind": 
        { path: "$asignaciones", preserveNullAndEmptyArrays: true } 
    },
    {$group : 
        {
           _id : { ano: "$ano", periodo:"$periodo", carrera: "$asignaciones.carrera"},
           count: { $sum: 1 }
        }
    },
    {$match:{ "_id.carrera": carr }}
]).exec(callback);

}

module.exports.verificarSni = function(data, callback){

    Sni.aggregate([
        { $lookup: 
            {
            from: 'estudiantes',
            localField: 'estudiante',
            foreignField: '_id',
            as: 'estudiante'
            }
        },
        { $unwind: 
            { 
            path: "$estudiante", 
            preserveNullAndEmptyArrays: true 
            }
        },
        { $match: 
            {
            'estudiante.cedula': data.cedula
            }
        },
        { $match: 
            {
            'ano': data.ano
            }
        }
    ]).exec(callback);
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