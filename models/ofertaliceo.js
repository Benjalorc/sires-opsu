const mongoose = require('mongoose');
const config = require('../config/database');

const OfertaliceoSchema = mongoose.Schema({

	liceo:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "liceo",
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
	oferta:[{
		carrera: {
			type: mongoose.Schema.Types.ObjectId, 
        	ref: "Carrera",
        	required: true
		},
		universidad: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Universidad",
			required: true
		},
		cupos: {
			type: Number,
			min: 0,
			required: true
		}
	}]
}, { minimize: false });

const Ofertaliceo = module.exports = mongoose.model('Ofertaliceo', OfertaliceoSchema, 'ofertaliceos');

module.exports.check = function(query, callback){

	Ofertaliceo.aggregate([
		{ $lookup: 
			{
			from:"liceos", 
			localField:"liceo", 
			foreignField:"_id",
			as:"liceo"
			}
		},
		{ $match: {"liceo.codigo": query.liceo} },
		{ $match: {ano: query.ano} },
		{ $match: {periodo: query.periodo} }
	]).exec(callback);
}

module.exports.crear = function(ofertaliceo, callback){
	ofertaliceo.save(callback);
}

module.exports.addOffer = function(data, callback){

	Ofertaliceo.findOne({liceo: data.liceo, ano: data.ano, periodo: data.periodo}, callback);
}

module.exports.obtener = function(data, callback){

	Ofertaliceo.aggregate([
		{ $project :
			{
			_id:0,
			"oferta._id":0
			}
		},
		{ $group : 
			{ 
			_id : "$liceo", 
			ofertas: { $push: "$$ROOT" } 
			} 
		},
		{ $lookup :
			{
			from: 'liceos',
			localField: '_id',
			foreignField: '_id',
			as: 'liceo'
			}
		},
		{ "$unwind": 
			{ 
			path: "$liceo", 
			preserveNullAndEmptyArrays: true 
			} 
		},
		{ $project :
			{
			_id: 0,
			ofertas:1,
			liceo:1
			}
		},
		{ $project :
			{
			"ofertas.liceo":0,
			"liceo._id":0
			}
		}
	]).exec(callback);
}