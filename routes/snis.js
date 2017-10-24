const express = require('express');
const router = express.Router();
const Sni = require('../models/sni');
const Estudiante = require('../models/estudiante');
const Carrera = require('../models/carrera');


//AGREGAR SNI
router.post('/agregar', (req, res, next) =>{

    let cedula = req.body.estudiante;
    console.log(req.body);
    console.log(cedula);
    Estudiante.buscarEstudiante(cedula, (err, estudiante) =>{
        
        if(err){
            return res.json({success: false, msg:"No se pudo ejecutar la consulta en la coleccion estudiantes"});
        }
        
        if(estudiante){
            
            let query = {estudiante: estudiante._id};
            console.log(query);
            console.log(estudiante);
            Sni.buscarSni(query, (err, sni) =>{

                if(err){
                    return res.json({success: false, msg:"Error intentando verificar sni"});
                }

                if (sni) {
                    return res.json({success: false, msg:"Ya existe un registro de SNI asociado a la cedula proporcionada"});
                }

                else{


                    let query = {codigo: req.body.codigo};
                    Sni.buscarSni(query, (err, sni) =>{
                        if(err){
                            return res.json({success: false, msg:"Se produjo un error al consulta a sni"});
                        }
                        if(sni){
                            return res.json({success: false, msg:"Ya existe un registro de sni con ese codigo"});
                        }
                        else{




                            Carrera.listarCarreras('', (err, carreras) =>{
                            
                                if(err){
                                    return res.json({success: false, msg: "Error al ejecutar la consulta"});
                                }

                                if(carreras){

                                    let newSni = new Sni({
                                        codigo: req.body.codigo,
                                        ano: req.body.ano,
                                        estudiante: estudiante._id,
                                        opciones: {
                                            a: carreras.find(function(element){ return element.codigo == req.body.opciones.a})._id,
                                            b: carreras.find(function(element){ return element.codigo == req.body.opciones.b})._id,
                                            c: carreras.find(function(element){ return element.codigo == req.body.opciones.c})._id,
                                            d: carreras.find(function(element){ return element.codigo == req.body.opciones.d})._id,
                                            e: carreras.find(function(element){ return element.codigo == req.body.opciones.e})._id,
                                            f: carreras.find(function(element){ return element.codigo == req.body.opciones.f})._id
                                        }
                                    });
                                    
                                    Sni.agregarSni(newSni, (err, sni) =>{
                                        if(err){
                                            return res.json({success:false, msg:"Fallo al agregar SNI en la base de datos"});
                                        }else{
                                            return res.json({success:true, msg:"SNI agregado con exito"});
                                        }
                                    });                           

                                }
                                else{
                                    return res.json({success: false, msg: "Listado de carreras no encontrado"});
                                }
                            });
                        }
                    });
             
                }

            });

        }
        else{
            return res.json({success: false, msg:"El estudiante con la cedula proporcionada no existe en los registros"});
        }
    });

});


router.get('/all', (req, res, next) =>{
    'use strict';

    Sni.obtenerSnis('', (err, data) =>{
        if(err){
           return res.json({success: false, msg: "Error al ejecutar consulta en Sni"});            
        }

        if(data){

            let upperData = data;
            Estudiante.getAllStudents('', (err, data) =>{
                if(err){
                    console.log("CAGASTE");
                }
                if(data){
                    let estudiantesArr = [];

                    data.forEach((element) =>{
                        estudiantesArr.push({cedula: element.cedula, municipio: element.mun.nombre});
                    });

                    let snis = [];

                    upperData.forEach((element) =>{
                        let upperElement = element;
                        let sni = {
                            codigo: element.codigo,
                            ano: element.ano,
                            estudiante: element.estudiante.cedula,
                            municipio: estudiantesArr.find((element) =>{return upperElement.estudiante.cedula == element.cedula}).municipio,
                            carreras: {
                                a: {
                                    nombre: element.opciones.a.nombre,
                                    especialidad: element.opciones.a.especialidad,
                                    area: element.opciones.a.area
                                }, 
                                b: {
                                    nombre: element.opciones.b.nombre,
                                    especialidad: element.opciones.b.especialidad,
                                    area: element.opciones.b.area
                                }, 
                                c: {
                                    nombre: element.opciones.c.nombre,
                                    especialidad: element.opciones.c.especialidad,
                                    area: element.opciones.c.area
                                }
                            }
                        }
                        console.log(sni);
                        console.log(element.estudiante.mun);
                        snis.push(sni);
                    });

                    return res.json({success: true, msg: "Se preparo un listado de los snis encontrados", data: snis});

                }
                else{
                    console.log("CAGASTE DOBLE");
                }
            });
        }
        else{
           return res.json({success: false, msg: "No se encontraron snis"});
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