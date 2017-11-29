const express = require('express');
const router = express.Router();
const Estudiante = require('../models/est_opsu');
const Parroquia = require('../models/parroquia');

router.post('/insertar', (req, res, next) =>{
    'use strict';

    let estudiantes = req.body;
    let documentos = [];

    estudiantes.forEach((element) =>{

        let estudiante = new Estudiante({
            cedula: element.cedula,
            sexo: element.sexo,
            f_nac: element.f_nac,
            liceo: element.liceo,
            mencion: element.mencion,
            ano_egreso: element.ano_egreso,
            residencia: element.residencia
        });

        documentos.push(estudiante);
    });

    Estudiante.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});

//REGISTRAR ESTUDIANTE
router.post('/registrar', (req, res, next) =>{
    'use strict';
    
    Estudiante.buscarEstudiante(req.body.cedula, (err, est) => {
        if(err){
            return res.json({success: false, msg:"No se pudo ejecutar la consulta de estudiantes"});
        }
        
        if(est){
            return res.json({success: false, msg:"Ya existe ese estudiante"});
        }
        else{
            let query = {codigo: req.body.parroquia};
            Parroquia.buscarParroquia(query, (err, parr) =>{
        
                if(err){
                    return res.json({success: false, msg:"No se pudo alcanzar la parroquia"});
                }
                
                if(parr){

                    Liceo.buscarLiceo(req.body.liceo, (err, lic) =>{


                        if(err) throw err;

                        if(lic){


                            let newEstudiante = new Estudiante({
                                cedula: req.body.cedula,
                                f_nac: req.body.f_nac,
                                ano_egreso: req.body.ano_egreso,
                                sexo: req.body.sexo,
                                residencia: parr._id,
                                liceo: lic._id
                            });
                            
                            Estudiante.registrarEstudiante(newEstudiante, (err, user) =>{
                                                
                                if(err){
                                    return res.json({success:false, msg:"Fallo al registrar estudiante"});
                                }else{
                                    return res.json({success:true, msg:"Estudiante registrado con exito"});
                                }
                            });

                        }
                        else{
                            return res.json({success: false, msg:"No se pudo encontrar al liceo"});
                        }

                    });             

                }
                else{
                    return res.json({success: false, msg:"No se pudo encontrar al municipio"});
                }
        
                
            });    

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