const express = require('express');
const router = express.Router();
const Sni = require('../models/sni_opsu');
const Estudiante = require('../models/estudiante');
const Carrera = require('../models/carrera');


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
                                        opciones: [
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.a}).codigo,
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.b}).codigo,
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.c}).codigo,
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.d}).codigo,
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.e}).codigo,
                                            carreras.find((element) =>{ return element.codigo == req.body.opciones.f}).codigo
                                        ]
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
                        estudiantesArr.push({cedula: element.cedula, parroquia: element.parroquia});
                    });

                    let snis = [];

                    upperData.forEach((element) =>{
                        let upperElement = element;
                        let sni = {
                            codigo: element.codigo,
                            ano: element.ano,
                            estudiante: element.estudiante.cedula,
                            parroquia: estudiantesArr.find((element) =>{return upperElement.estudiante == element.cedula}).parroquia,
                            carreras: element.carreras,
                            asignada: element.asignada
                        }
                        console.log(sni);
                        console.log(element.estudiante.parroquia);
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

router.get('/ind', (req, res, next) =>{
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
                        estudiantesArr.push({cedula: element.cedula, parroquia: element.parroquia});
                    });

                    let snis = [];

                    upperData.forEach((element) =>{
                        let upperElement = element;
                        let sni = {
                            codigo: element.codigo,
                            ano: element.ano,
                            estudiante: element.estudiante.cedula,
                            ano_egreso: element.estudiante.ano_egreso,
                            parroquia: estudiantesArr.find((element) =>{return upperElement.estudiante == element.cedula}).parroquia,
                            carreras: element.carreras,
                            asignada: element.asignada
                        }
                        console.log(sni);
                        console.log(element.estudiante);
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

            let cedula = estudiante.cedula;
            console.log(estudiante);
            Sni.buscarSni(cedula, (err, sni) =>{
                
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