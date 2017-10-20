const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudiante');
const Municipio = require('../models/municipio');


//REGISTRAR ESTUDIANTE
router.post('/registrar', (req, res, next) =>{
    'use strict';
    
    Municipio.buscarMunicipio(req.body.municipio, (err, mun) =>{

        if(err){
            return res.json({success: false, msg:"No se pudo alcanzar al municipio"});
        }
        
        if(mun){
            
            let newEstudiante = new Estudiante({
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                f_nac: req.body.f_nac,
                sexo: req.body.sexo,
                mun: mun._id
            });
            
            Estudiante.registrarEstudiante(newEstudiante, (err, user) =>{
                                
                if(err){
                    return res.json({success:false, msg:"Fallo al registrar estudiante"});
                }else{
                    return res.json({success:true, msg:"Estudiante registrado con exito"});
                }
            });
        }else{
            return res.json({success: false, msg:"No se pudo encontrar al municipio"});
        }

        
    });
    
    
});

//OBTENER ESTUDIANTE
router.get('/buscar/:cedula/:completo?', (req, res, next) =>{
   'use strict'; 
    
    let cedula = req.params.cedula;
    if(req.params.completo==1){
        Estudiante.buscarEstudianteCompleto(cedula, (err, est) =>{
        
            if(err){
                console.log(err);
                return res.json({success: false, msg: "Error al ejecutar la consulta"});
            }
        
            if(est){
                return res.json({success: true, msg: "Se encontro el estudiante completo", data: est});
            }else{
                return res.json({success: false, msg: "Estudiante no encontrado"});
            }
        });        
    }else{
        Estudiante.buscarEstudiante(cedula, (err, est) =>{
        
        
            if(err){
                return res.json({success: false, msg: "Error al ejecutar la consulta"});
            }
        
            if(est){
                return res.json({success: true, msg: "Se encontro el estudiante", data: est});
            }else{
                return res.json({success: false, msg: "Estudiante no encontrado"});
            }
        });
    }
    
});

router.get('/all', (req, res, next) =>{
   'use strict'; 

    Estudiante.getAllStudents('', (err, data) =>{
        
        if(err){
            console.log(err);
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(data){
            return res.json({success: true, msg: "Se encontro el listado de estudiantes", data: data});
        }else{
            return res.json({success: false, msg: "Listado de estudiantes no encontrado"});
        }
    });        
});

//ACTUALIZAR ESTUDIANTE
router.put('/actualizar', (req, res, next) =>{
   'use strict'; 
    
    let estudiante = {
        cedula: req.body.cedula,
        updatedData: req.body.datosNuevos
    }
    
    Estudiante.actualizarEstudiante(estudiante, (err, est) =>{
       
       if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
       }
       
       if(est){
            return res.json({success: true, msg: "Se actualizo el estudiante"});
        }else{
            return res.json({success: false, msg: "Estudiante no pudo actualizarse"});
        }
    });
});

//ELIMINAR ESTUDIANTE
router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let cedula = req.body.cedula;
    
    Estudiante.eliminarEstudiante(cedula, (err, mun) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
       if(mun){
            return res.json({success: true, msg: "Se elimino el estudiante"});
        }else{
            return res.json({success: false, msg: "El estudiante no pudo ser eliminado"});
        }
    });
});

module.exports = router;