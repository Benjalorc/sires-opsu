const mongoose = require('mongoose');
const config = require('../config/database');

//Indicadores
const IndicadorSchema = mongoose.Schema({


	codigo:{
		type: String,
		required: true
	},
	perspectiva:{
		type: String,
		required: true
	},
	factor:{
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
	tendencia:{
		type: String,
		required: true
	},
	periodicidad:{
		type: String,
		required: true
	},
	vc:{
		type: Number,
		required: true
	},	
	ve:{
		type: Number,
		required: true
	},
	mensajeExito:{
		type: String,
		default: "",
		required: false
	},
	mensajeAlerta:{
		type: String,
		default: "",
		required: false
	},
	mensajeCritico:{
		type: String,
		default: "",
		required: false
	}
});

const Indicador = module.exports = mongoose.model('Indicador', IndicadorSchema, 'indicadores');

module.exports.guardarIndicador = function(indicador, callback){
	indicador.save(callback);
}

module.exports.buscarIndicador = function(query, callback){
	
	Indicador.findOne(query, callback);
}

module.exports.listarIndicadores = function(query, callback){
	
	Indicador.find({}, callback);
}

module.exports.editarIndicador = function(datos, callback){
	
	console.log("DATOS");
	console.log(datos);
	Indicador.findOneAndUpdate(
		{codigo: datos.codigo}, 
		{$set: {
				vc: datos.vc, 
				ve: datos.ve,
				mensajeExito: datos.mensajeExito,
				mensajeAlerta: datos.mensajeAlerta,
				mensajeCritico: datos.mensajeCritico
		}}, callback);
}

module.exports.eliminarIndicador = function(codigo, callback){
	
	Indicador.findOneAndDelete({codigo: codigo}, callback);
}


