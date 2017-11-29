const mongoose = require('mongoose');
const config = require('../config/database');

const OfertaunivSchema = mongoose.Schema({

	universidad:{
		type: String,
		ref: "universidad",
		required: true
	},
	ano:{
		type: Number,
		min: 1,
		required: true
	},
	periodo:{
		type: Number,
		min: 1,
		max: 2,
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
	},
	inscritos: {
		opsu:{
			type: Number,
			default: 0,
			required: true
		},
		convenio:{
			type: Number,
			default: 0,
			required: true
		}
	},
	egresados: {
		graduacion:{		
			type: Number,
			default: 0,
			required: true
		},
		retiro:{
			type: Number,
			default: 0,
			required: true
		}
	}
}, { minimize: false });

const Ofertauniv = module.exports = mongoose.model('Ofertauniv', OfertaunivSchema, 'ofertaunivs');

module.exports.check = function(query, callback){

	Ofertauniv.aggregate([
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

module.exports.ofertar = function(ofertauniv, callback){
	ofertauniv.save(callback);
}

module.exports.verificar = function(ofertauniv, callback){
	Ofertauniv.findOne({universidad: ofertauniv.universidad, 
								ano: ofertauniv.ano, 
							periodo: ofertauniv.periodo, 
							carrera: ofertauniv.carrera
						}, callback)
}

module.exports.encontrar = function(query, callback){
	Ofertauniv.find(query, callback)
}

module.exports.addOffer = function(data, callback){

	Ofertauniv.findOne({universidad: data.universidad, ano: data.ano, periodo: data.periodo}, callback);
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

	Ofertauniv.aggregate([
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

module.exports.buscar = function(data, callback){

	let univ = data.univ;
	let carr = data.carr;
	let anoG = parseInt(data.ano);
	let anoP = parseInt(data.ano)-3;

	Ofertauniv.aggregate([
	    {$match: { universidad: univ, ano:{$gte: anoP, $lte: anoG }, carrera: carr } }
	]).exec(callback);

}

module.exports.inscribir = function(data, callback){


	Ofertauniv.findOneAndUpdate(
		{universidad: data.univ, 
		carrera: data.carr, 
		ano: data.ano, 
		periodo: data.periodo}, 
		{$set: {inscritos: data.inscritos}}).exec(callback);

}