const mongoose = require('mongoose');
const db = mongoose.createConnection("mongodb://benjapc:alois007@ds117271.mlab.com:17271/opsu")

//PNEV Schema
const PnevSchema = mongoose.Schema({
    
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
    resultados:[{type: String, ref: "Carrera", required: true}]
});

const Pnev = module.exports = db.model('Pnev', PnevSchema);

module.exports.agregarPnev = function(pnev, callback){
    pnev.save(callback);
}

module.exports.buscarPnev = function(query, callback){

    Pnev.findOne(query, callback)
}

module.exports.obtenerPnevsRepoblados = function(data, callback){
    const query = {};

    Pnev.aggregate([
        {$lookup:
            {
            from: 'carreras',
            localField: 'resultados',
            foreignField: 'codigo',
            as: 'carreras'
            }
        },
        {$lookup:
            {
            from: 'estudiantes',
            localField: 'estudiante',
            foreignField: 'cedula',
            as: 'estudiante'
            }
        }
    ]).exec(callback);

}

module.exports.obtenerPnevs = function(data, callback){

    const query = {};
    Pnev.find(query, callback);
}

module.exports.corregirPnev = function(data, callback){
    
    const query = {cedula: data.cedula};
    Pnev.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarPnev = function(data, callback){
    
    const query = {cedula: data};
    Pnev.findOneAndRemove(query, callback);
}