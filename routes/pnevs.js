const express = require('express');
const router = express.Router();
const Pnev = require('../models/pnev');
const Estudiante = require('../models/estudiante');
const Carrera = require('../models/carrera');

router.post('/agregar', (req, res, next) =>{
    'use strict';

    let cedula = req.body.cedula;

    Estudiante.buscarEstudiante(cedula, (err, estudiante) =>{
        
        if(err){
            return res.json({success: false, msg:"No se pudo ejecutar la consulta en la coleccion estudiantes"});
        }
        
        if(estudiante){
            Carrera.listarCarreras('', (err, carreras) =>{
                
                if(err){
                    return res.json({success: false, msg: "Error al ejecutar la consulta"});
                }
                
                if(carreras){
                    console.log(carreras);
                    let newPnev = new Pnev({
                        codigo: req.body.pnev.codigo,
                        ano: req.body.pnev.ano,
                        estudiante: estudiante._id,
                        resultados: {
                            a: carreras.find(function(element){ return element.codigo == req.body.pnev.resultados.a})._id,
                            b: carreras.find(function(element){ return element.codigo == req.body.pnev.resultados.b})._id,
                            c: carreras.find(function(element){ return element.codigo == req.body.pnev.resultados.c})._id
                        }
                    });
                    
                    Pnev.agregarPnev(newPnev, (err, pnev) =>{
                        if(err){
                            return res.json({success:false, msg:"Fallo al agregar PNEV en la base de datos"});
                        }else{
                            return res.json({success:true, msg:"PNEV agregado con exito"});
                        }
                    });
                }else{
                    return res.json({success: false, msg: "Listado de carreras no encontrado"});
                }
            });
            
            
        }else{
            return res.json({success: false, msg:"No se encontro al estudiante"});
        }
    });
});
    
router.get('/buscar/:cedula', (req, res, next) =>{
    'use strict';

    let cedula = req.params.cedula;
    Estudiante.buscarEstudiante(cedula, (err, estudiante) =>{
       
       if(err){
           return res.json({success: false, msg: "Error al ejecutar consulta en Estudiante"});
       }
       
       if(estudiante){

            let codigo = estudiante._id;
            console.log(estudiante);
            Pnev.buscarPnev(codigo, (err, pnev) =>{
                
                if(err){
                    return res.json({success: false, msg: "Error al ejecutar la consulta"});
                }
                
                if(pnev){
                    return res.json({success: true, msg: "Se encontro el registro de PNEV", data: pnev});
                }else{
                    return res.json({success: false, msg: "Registro de PNEV no encontrado"});
                }
            });
       }else{
           return res.json({success: false, msg: "No se encontro al estudiante"});
       }
    });
});

router.put('/actualizar', (req, res, next) =>{
    'use strict'; 
    
    let pnev = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Pnev.actualizarPnev(pnev, (err, pnevCb) =>{
       
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(pnevCb){
            return res.json({success: true, msg: "Se actualizo la pnev"});
        }else{
            return res.json({success: false, msg: "La pnev no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let pnevCb_cod = req.body.codigo;
    
    Pnev.eliminarPnev(pnevCb_cod, (err, pnevCb) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(pnevCb){
            return res.json({success: true, msg: "Se elimino la pnev"});
        }else{
            return res.json({success: false, msg: "La pnev no pudo ser eliminada"});
        }
    });
});

module.exports = router;