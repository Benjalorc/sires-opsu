const express = require('express');
const router = express.Router();
const Indicador = require('../models/indicador');

router.post('/guardarnuevo', (req, res, next) =>{


	Indicador.buscarIndicador({codigo: req.body.codigo}, (err, ind) =>{

		if(err) throw err;

		if(ind){
			return res.json({success: false, msg:"Ya existe un indicador con ese codigo"});
		}
		else{


			let newIndicador = new Indicador({
				codigo: req.body.codigo,
				perspectiva: req.body.perspectiva,
				factor: req.body.factor,
				nombre: req.body.nombre,
				tipo: req.body.tipo,
				tendencia: req.body.tendencia,
				periodicidad: req.body.periodicidad,
				vc: req.body.vc,
				ve: req.body.ve
			});

			Indicador.guardarIndicador(newIndicador, (err, nuevo) =>{

				if (err) throw err;

				if(nuevo){
					return res.json({success: true, msg:"Indicador guardado con exito!", data: nuevo});
				}
				else{
					return res.json({success: false, msg:"No se pudo guardar el indicador"});
				}

			});


		}

	});

});


router.get('/listar', (req, res, next) =>{

	Indicador.listarIndicadores('', (err, indicadores) =>{

		if(err) throw err;

		if(indicadores.length){
			console.log(indicadores);
			return res.json({success: true, msg:"Se encontro el listado de los indicadores", data: indicadores});
		}
		else{
			return res.json({success: false, msg:"No se pudieron encontrar los indicadores"});			
		}


	});

});

router.get('/buscar/:codigo', (req, res, next) =>{


	Indicador.buscarIndicador({codigo: req.params.codigo}, (err, indicador) =>{

		if(err) throw err;

		if(indicador){
			return res.json({success: true, msg:"Se encontro el indicador", data: indicador});
		}
		else{
			return res.json({success: false, msg:"No se pudo encontrar el indicador"});
		}

	});

});


router.put('/actualizar', (req, res, next) =>{


	Indicador.buscarIndicador({codigo: req.body.cod}, (err, indicador) =>{

		if(err) throw err;

		if(indicador){

			let datos = {
				codigo: req.body.cod,
				vc: req.body.vc,
				ve: req.body.ve,
				mensajeExito: req.body.mensajeExito,
				mensajeAlerta: req.body.mensajeAlerta,
				mensajeCritico: req.body.mensajeCritico
			}

			Indicador.editarIndicador(datos, (err, actualizado) =>{

				if(err) throw err;

				if(actualizado){
					return res.json({success: true, msg:"Indicador actualizado exitosamente", data: actualizado});
				}
				else{
					return res.json({success: false, msg:"No se pudo actualizar el indicador"});
				}


			});

		}
		else{
			return res.json({success: false, msg:"No se pudo encontrar el indicador"});
		}

	});

});


router.delete('/borrar', (req, res, next) =>{


	Indicador.buscarIndicador({codigo: req.params.codigo}, (err, indicador) =>{

		if(err) throw err;

		if(indicador){


			Indicador.eliminarIndicador({codigo: req.body.codigo}, (err, eliminado) =>{

				if(err) throw err;

				if(eliminado){
					return res.json({success: false, msg:"Se elimino el indicador exitosamente", data: eliminado});
				}
				else{
					return res.json({success: false, msg:"No se pudo eliminar el indicador"});			
				}

			})


		}
		else{
			return res.json({success: false, msg:"No se pudo encontrar el indicador"});
		}

	});

});

module.exports = router;