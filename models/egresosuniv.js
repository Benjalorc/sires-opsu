const mongoose = require('mongoose');
const config = require('../config/database');

const EgresosunivSchema = mongoose.Schema({

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
	egresados: [{
		ano:{
			type: Number,
			required: true
		},
		periodo:{
			type: Number,
			required: true
		},
		graduacion:{
			type: Number,
			required: true
		},
		retiro:{
			type: Number,
			required: true
		}
	}]
}, { minimize: false });

const Egresosuniv = module.exports = mongoose.model('Egresosuniv', EgresosunivSchema, 'egresosunivs');

module.exports.guardar = function(egreso, callback){

	egreso.save(callback);
}

module.exports.buscar = function(data, callback){

	Egresosuniv.findOne({universidad: data.univ, carrera: data.carr, ano: data.ano, periodo: data.periodo}, callback);

}