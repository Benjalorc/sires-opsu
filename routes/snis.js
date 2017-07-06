const express = require('express');
const router = express.Router();
const Sni = require('../models/sni');
const Estudiante = require('../models/estudiante');
const Carrera = require('../models/carrera');


//AGREGAR SNI
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

                    let newSni = new Sni({
                        codigo: req.body.sni.codigo,
                        ano: req.body.sni.ano,
                        estudiante: estudiante._id,
                        opciones: {
                            a: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.a})._id,
                            b: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.b})._id,
                            c: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.c})._id,
                            d: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.d})._id,
                            e: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.e})._id,
                            f: carreras.find(function(element){ return element.codigo == req.body.sni.opciones.f})._id
                        }
                    });
                    
                    Sni.agregarSni(newSni, (err, sni) =>{
                        if(err){
                            return res.json({success:false, msg:"Fallo al agregar sni en la base de datos"});
                        }else{
                            return res.json({success:true, msg:"Sni agregada con exito"});
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
            Sni.buscarSni(codigo, (err, sni) =>{
                
                if(err){
                    return res.json({success: false, msg: "Error al ejecutar la consulta"});
                }
                
                if(sni){
                    return res.json({success: true, msg: "Se encontro el registro de SNI", data: sni});
                }else{
                    return res.json({success: false, msg: "Registro de SNI no encontrado"});
                }
            });
       }else{
           return res.json({success: false, msg: "No se encontro al estudiante"});
       }
    });
});

router.put('/actualizar', (req, res, next) =>{
    'use strict'; 
    
    let sni = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Sni.actualizarSni(sni, (err, sniCb) =>{
       
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(sniCb){
            return res.json({success: true, msg: "Se actualizo la sni"});
        }else{
            return res.json({success: false, msg: "La sni no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let sniCb_cod = req.body.codigo;
    
    Sni.eliminarSni(sniCb_cod, (err, sniCb) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(sniCb){
            return res.json({success: true, msg: "Se elimino la sni"});
        }else{
            return res.json({success: false, msg: "La sni no pudo ser eliminada"});
        }
    });
});

module.exports = router;