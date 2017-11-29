const mongoose = require('mongoose');
const db = mongoose.createConnection("mongodb://benjapc:alois007@ds117271.mlab.com:17271/opsu")

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
        }
    }],
    asignada:{
        type: Number,
        required: true,
        default: 0
    }
});

const Sni = module.exports = db.model('Sni', SniSchema);

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