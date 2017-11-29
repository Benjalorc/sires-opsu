const express = require('express');
const router = express.Router();
const Liceo = require('../models/liceo');
const Municipio = require('../models/municipio');
const Parroquia = require('../models/parroquia');
const Carrera = require('../models/carrera');

router.post('/insertar', (req, res, next) =>{
    'use strict';

    let liceos = req.body;
    let documentos = [];

    liceos.forEach((element) =>{

        let liceo = new Liceo({
            codigo: element.codigo,
            nombre: element.nombre,
            tipo: element.tipo,
            parroquia: element.parroquia,
            menciones: element.menciones
        });

        documentos.push(liceo);
    });

    Liceo.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});

//REGISTRAR LICEO
router.post('/registrar', (req, res, next) =>{
    'use strict';

    let cod_lic = req.body.codigo;
    let query = {codigo: req.body.parroquia};
    Parroquia.buscarParroquia(query, (err, parroquia) =>{

        if(err){

            return res.json({success: false, msg: "Error al consultar en parroquia"});
        }

        if(parroquia){

            Liceo.verificarLiceo(cod_lic, (err, liceo) =>{
                if(err){
                    return res.json({success: false, msg: "Error al consultar en liceo"});
                }
                if (liceo){
                    return res.json({success: false, msg: "Ya existia ese liceo"});
                }
                else{
                    let newLiceo = new Liceo({
                        
                        codigo: req.body.codigo,
                        nombre: req.body.nombre,
                        tipo: req.body.tipo,
                        parroquia: parroquia.codigo,
                        menciones: req.body.menciones
                    });

                    console.log(newLiceo);
                    Liceo.registrarLiceo(newLiceo, (err, liceo) =>{
                
                        if(err){
                            return res.json({success:false, msg:"Fallo al agregar liceo en la base de datos"});
                        }else{
                            return res.json({success:true, msg:"Liceo agregado con exito"});
                        }
                    });
                }
            });
        }
        else{
            res.json({success: false, msg: "No se pudo ubicar la parroquia indicada"});
        }
    });
});
    
router.get('/buscar/:codigo', (req, res, next) =>{
    'use strict';

    let codigo = req.params.codigo;

    Liceo.buscarLiceo(codigo, (err, liceo) =>{
                
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(liceo){
            return res.json({success: true, msg: "Se encontro la liceo", data: liceo});
        }else{
            return res.json({success: false, msg: "Liceo no encontrada"});
        }
    });
});

router.get('/all', (req, res, next) =>{
   'use strict';
   
   Liceo.listarLiceos('', (err, liceos) =>{

        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(liceos){
            return res.json({success: true, msg: "Se encontro el listado de liceos", data: liceos});
        }else{
            return res.json({success: false, msg: "Listado de liceos no encontrado"});
        }
   });
});

router.put('/incluircarrera', (req, res, next) =>{
    
    let carr_cod = req.body.carrera;
    Carrera.buscarCarrera(carr_cod, (err, carrera) =>{
        
        if(err){
            return res.json({success: false, msg: "Error al consultar en carrera"});
        }
        
        if(carrera){
            
            let liceo = {
                codigo: req.body.codigo,
                updatedData: carrera._id
            }
            
            console.log(liceo);
            Liceo.incluirCarrera(liceo, (err, uni) =>{
               
                if(err){
                   return res.json({success: false, msg: "Error al ejecutar la consulta"});
                }
               
                if(uni){
                    uni.carreras.push(liceo.updatedData);
                    uni.save(function(err, newUni){
                        
                        if(err){
                            return res.json({success: false, msg: "No se pudo incluir la carrera"});
                        }else{
                            return res.json({success: true, msg: "Todo parece estar en orden"});
                        }
                    });
                }else{
                    return res.json({success: false, msg: "La carrera no pudo incluirse"});
                }
            });            
        }else{
            return res.json({success: false, msg: "No se encontro la carrera"});
        }
    });
});



router.put('/actualizar', (req, res, next) =>{
    'use strict'; 
    
    let liceo = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Liceo.actualizarLiceo(liceo, (err, uni) =>{
       
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(uni){
            return res.json({success: true, msg: "Se actualizo la liceo"});
        }else{
            return res.json({success: false, msg: "La liceo no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let uni_cod = req.body.codigo;
    
    Liceo.eliminarLiceo(uni_cod, (err, uni) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(uni){
            return res.json({success: true, msg: "Se elimino la liceo"});
        }else{
            return res.json({success: false, msg: "La liceo no pudo ser eliminada"});
        }
    });
});

module.exports = router;