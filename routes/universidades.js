const express = require('express');
const router = express.Router();
const Universidad = require('../models/universidad');
const Municipio = require('../models/municipio');
const Carrera = require('../models/carrera');


//REGISTRAR UNIVERSIDAD
router.post('/registrar', (req, res, next) =>{
    'use strict';

    let cod_mun = req.body.municipio;
    let cod_univ = req.body.codigo;
    console.log("Universidad es: "+cod_univ);
    Municipio.buscarMunicipio(cod_mun, (err, municipio) =>{
        
        if(err){
            return res.json({success: false, msg: "Error al consultar en municipio para asociar a universidad"});
        }
        
        if(municipio){
            
            Universidad.buscarUniversidad(cod_univ, (err, universidad) =>{
                if(err){
                    return res.json({success: false, msg: "Error al consultar en universidad"});
                }
                if (universidad){
                    return res.json({success: false, msg: "Ya existia esa universidad"});
                }
                else{
                    let newUniversidad = new Universidad({
                    codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    municipio: municipio._id,
                    capacidad: req.body.capacidad,
                    poblacion: req.body.poblacion
                    });

                    console.log(newUniversidad);
                    Universidad.registrarUniversidad(newUniversidad, (err, universidad) =>{
                
                        if(err){
                            return res.json({success:false, msg:"Fallo al agregar universidad en la base de datos"});
                        }else{
                            return res.json({success:true, msg:"Universidad agregada con exito"});
                        }
                    });
                }
            });
        }
        else{
            return res.json({success: false, msg: "No se encontro el municipio"})
        }
    })
    
});
    
router.get('/buscar/:codigo', (req, res, next) =>{
    'use strict';

    let codigo = req.params.codigo;

    Universidad.buscarUniversidad(codigo, (err, universidad) =>{
                
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(universidad){
            return res.json({success: true, msg: "Se encontro la universidad", data: universidad});
        }else{
            return res.json({success: false, msg: "Universidad no encontrada"});
        }
    });
});

router.get('/all', (req, res, next) =>{
   'use strict';
   
   Universidad.listarUniversidades('', (err, universidades) =>{

        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(universidades){
            return res.json({success: true, msg: "Se encontro el listado de universidades", data: universidades});
        }else{
            return res.json({success: false, msg: "Listado de universidades no encontrado"});
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
            
            let universidad = {
                codigo: req.body.codigo,
                updatedData: carrera._id
            }
            
            console.log(universidad);
            Universidad.incluirCarrera(universidad, (err, uni) =>{
               
                if(err){
                   return res.json({success: false, msg: "Error al ejecutar la consulta"});
                }
               
                if(uni){
                    uni.carreras.push(universidad.updatedData);
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
    
    let universidad = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Universidad.actualizarUniversidad(universidad, (err, uni) =>{
       
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(uni){
            return res.json({success: true, msg: "Se actualizo la universidad"});
        }else{
            return res.json({success: false, msg: "La universidad no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let uni_cod = req.body.codigo;
    
    Universidad.eliminarUniversidad(uni_cod, (err, uni) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(uni){
            return res.json({success: true, msg: "Se elimino la universidad"});
        }else{
            return res.json({success: false, msg: "La universidad no pudo ser eliminada"});
        }
    });
});

module.exports = router;