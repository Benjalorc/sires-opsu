const mongoose = require('mongoose');
const db = mongoose.createConnection("mongodb://benjapc:alois007@ds117271.mlab.com:17271/opsu")


const EstudianteOpsuSchema = mongoose.Schema({
    
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

const Estudiante = module.exports = db.model('Estudiante', EstudianteOpsuSchema);

module.exports.registrarEstudiante = function(estudiante, callback){
    estudiante.save(callback);
}

module.exports.guardarVarios = function(documentos, callback){
    Estudiante.insertMany(documentos, callback);
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

    Estudiante.find({},{_id:0,__v:0}).exec(callback);
}

module.exports.actualizarEstudiante = function(data, callback){

    const query = {cedula: data.cedula};
    Estudiante.findOneAndUpdate(query, { $set: data.updatedData}, callback);
}

module.exports.eliminarEstudiante = function(data, callback){

    const query = {cedula: data};
    Estudiante.findOneAndRemove(query, callback);
}