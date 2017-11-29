const express = require('express');
const router = express.Router();
const Asignacionopsu = require('../models/asignacionopsu');
const Universidad = require('../models/universidad');
const Carrera = require('../models/carrera');
const Parroquia = require('../models/parroquia');

router.post('/agregar', (req, res, next) =>{

    let asignacion = new Asignacionopsu({
      universidad: req.body.universidad,
      periodo: req.body.periodo,
      ano: req.body.ano,
      carrera: req.body.carrera,
      cupos: req.body.cupos,
      inscritos: 0
    });

    Asignacionopsu.crear(asignacion, (err, data) =>{

        if(err) throw err;

        if(data){
            res.json({success: true, msg: "Se guardó con exito la asignacion", data: data});
        }
        else{
            res.json({success: false, msg: "No se logro guardar la asignacion"});
        }
    });

});

router.get('/all', (req, res, next) =>{

    Asignacionopsu.obtener({}, (err, asignaciones) =>{
        if(err) throw err;

        if(asignaciones){
            res.json({success: true, msg: "Se obtuvieron con exito las asignaciones de las universidades", data: asignaciones});
        }
        else{
            res.json({success: false, msg: "No se pudieron obtener las asignaciones de las universidades"});
        }

   }); 

});

router.get('/buscar/:univ/:carrera', (req, res, next) =>{

    let carrera = req.params.carrera;
    let univ = req.params.univ;

    let query = {universidad: univ, carrera: carrera};
    
    Asignacionopsu.buscar(query, (err, asignaciones) =>{
        if(err) throw err;

        if(asignaciones){
            res.json({success: true, msg: "Se consguio la asignacion del periodo indicado", data: asignaciones});
        }
        else{
            res.json({success: false, msg: "No se pudieron conseguir registros de asignacion"});
        }

   }); 

});


router.put('/actualizar', (req, res, next) =>{
 
    let asignacion = {
      universidad: req.body.universidad,
      periodo: req.body.periodo,
      ano: req.body.ano,
      carrera: req.body.carrera,
      cupos: req.body.cupos,
      inscritos: req.body.inscritos
    }

    let query = {
      universidad: req.body.universidad,
      periodo: req.body.periodo,
      ano: req.body.ano,
      carrera: req.body.carrera,        
    }

    Asignacionopsu.buscar(query, (err, offer) =>{

        if (err) throw err;

        if (offer) {

            offer.cupos = req.body.cupos;

            offer.save((err, uOffer) =>{
                if (err) throw err;

                if (uOffer) {
                    res.json({success: true, msg: "Oferta corregida exitosamente"});
                }
                else {
                    res.json({success: false, msg: "Se encontro el documento pero no se pudieron guardar los cambios"});
                }

            });
        }
        else{
            res.json({success: false, msg: "No se pudo conseguir la asignacion que intento actualizar"});
        }

    });


});


router.delete('/eliminar', (req, res, next) =>{
 
});

module.exports = router;