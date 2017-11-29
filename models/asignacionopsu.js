const mongoose = require('mongoose');
const config = require('../config/database');

const AsignacionopsuSchema = mongoose.Schema({

	universidad:{
		type: String,
		ref: "universidad",
		required: true
	},
	periodo:{
		type: Number,
		min: 1,
		max: 2,
		required: true
	},
	ano:{
		type: Number,
		min: 1,
		required: true
	},
	carrera: {
		type: String, 
        ref: "Carrera",
        required: true
	},
	cupos: {
		type: Number,
		min: 0,
		required: true
	}
}, { minimize: false });

const Asignacionopsu = module.exports = mongoose.model('Asignacionopsu', AsignacionopsuSchema, 'asignacionesopsu');

module.exports.check = function(query, callback){

	Asignacionopsu.aggregate([
		{ $lookup: 
			{
			from:"universidades", 
			localField:"universidad", 
			foreignField:"_id",
			as:"universidad"
			}
		},
		{ $match: {"universidad.codigo": query.universidad} },
		{ $match: {ano: query.ano} },
		{ $match: {periodo: query.periodo} }
	]).exec(callback);
}

module.exports.crear = function(ofertauniv, callback){
	ofertauniv.save(callback);
}

module.exports.addOffer = function(data, callback){

	Asignacionopsu.findOne({universidad: data.universidad, ano: data.ano, periodo: data.periodo}, callback);
}

module.exports.listarOferta = function(data, callback){

	Ofertuniv.aggregate([
		
		{ $match: {"universidad.codigo": data.universidad} },
		{ $group : 
			{ 
			_id : "$ano", 
			ofertas: { $push: "$$ROOT" } 
			} 
		},
		{ $match: {_id: data.ano-1, _id: data.ano-2} },
		{ $lookup: 
			{
			from:"carreras", 
			localField:"ofertas.oferta.carrera", 
			foreignField:"_id",
			as:"ofertas.oferta.carrera"
			}
		},
		{ $match: {"ofertas.oferta.carrera.codigo": data.carrera} }

	]);
}

module.exports.obtener = function(data, callback){

	Asignacionopsu.aggregate([
		{ $project :
			{
			_id:0,
			"oferta._id":0
			}
		},
		{ $group : 
			{ 
			_id : "$universidad", 
			ofertas: { $push: "$$ROOT" } 
			} 
		},
		{ $lookup :
			{
			from: 'universidades',
			localField: '_id',
			foreignField: '_id',
			as: 'universidad'
			}
		},
		{ $project :
			{
			_id: 0,
			ofertas:1,
			universidad:1
			}
		},
		{ $project :
			{
			"ofertas.universidad":0,
			"universidad._id":0
			}
		}
	]).exec(callback);
}

module.exports.buscar = function(query, callback){

	Asignacionopsu.find(query, callback);
}