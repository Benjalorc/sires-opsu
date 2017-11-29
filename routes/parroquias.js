const express = require('express');
const router = express.Router();
const Parroquia = require('../models/parroquia');
const Municipio = require('../models/municipio');
const Estado = require('../models/estado');


router.post('/insertar', (req, res, next) =>{
    'use strict';

    let parroquias = req.body;
    let documentos = [];

    parroquias.forEach((element) =>{

        let parroquia = new Parroquia({
            codigo: element.codigo,
            municipio: element.municipio,
            nombre: element.nombre
        });

        documentos.push(parroquia);
    });

    Parroquia.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});


//REGISTRAR PARROQUIA
router.post('/registrar', (req, res, next) =>{
    'use strict';

    console.log(req.body)
    let query = {codigo: req.body.codigo};
    console.log(query);
    Parroquia.buscarParroquia(query, (err, parroquia) =>{

        if(err){
            return res.json({success: false, msg: 'Error intentando verificar parroquia'});
        }

        if(parroquia){
            return res.json({success: false, msg: 'La parroquia con ese codigo ya se encuentra registrada'});
        }
        else{

            Municipio.buscarMunicipio(req.body.municipio, (err, mun) =>{

                if(err){
                    return res.json({success: false, msg: 'Error ejecutando consulta en municipio'});
                }
                if(mun){


                    let newParroquia = new Parroquia({
                        codigo: req.body.codigo,
                        nombre: req.body.nombre,
                        poblacion: req.body.poblacion,
                        superficie: req.body.superficie,
                        municipio: mun._id
                    });

                    Parroquia.registrarParroquia(newParroquia, (err, parroquia) =>{
                        if(err){
                            return res.json({success:false, msg:"Fallo al registrar parroquia"});
                        }
                        else{
                            return res.json({success:true, msg:"Parroquia registrado con exito"});
                        }
                    });

                }
                else{
                    return res.json({success: false, msg: 'No se pudo encontrar ese municipio'});
                }

            });
        }
    });

});

//BUSCAR TODOS LAS PARROQUIAS

router.get('/buscar', (req, res, next) =>{
   'use strict'; 

    console.log(Date.now());    
    function traerParroquias(){
        return new Promise(function (resolve, reject) {
            Parroquia.find({},{_id: 0, __v: 0}, (err, parr) =>{
                resolve({parr: parr});
            });
        });
    }

    function traerMunicipios(parr){
        return new Promise(function (resolve, reject) {
            Municipio.find({},{_id: 0, __v: 0}, (err, mun) =>{
                resolve({mun: mun, parr: parr.parr});
            });
        });
    }

    function traerEstados(mun){
        return new Promise(function (resolve, reject) {
            Estado.find({},{_id: 0, __v: 0}, (err, est) =>{
                resolve({mun: mun.mun, parr: mun.parr, est: est});
            });
        });
    }

    traerParroquias()
        .then(parr => traerMunicipios(parr))
        .then(mun => traerEstados(mun))
        .then(obj =>{
            let orden = obj;
/*
            let estados = obj.est;
            let parroquias = obj.parr;
            let municipios = obj.mun;
            console.log(Date.now());
            estados.forEach((element) =>{

                let estado = {
                    codigo: element.codigo,
                    nombre: element.nombre,
                    estandar: element.estandar,
                    municipios: []
                };

                let ownMun = municipios.filter((element) =>{return element.estado == estado.codigo });;

                ownMun.forEach((element) =>{

                    let municipio = {
                        codigo: element.codigo,
                        nombre: element.nombre,
                        parroquias: []
                    }

                    let ownParr = parroquias.filter((element) =>{return element.municipio == municipio.codigo});

                    municipio.parroquias.push(ownParr);
                    estado.municipios.push(municipio);
                })

                orden.push(estado);
            });
*/
            console.log(Date.now());
            return res.json({success: true, msg: "Parroquias Encontradas", data: orden});
        });
});

//BUSCAR 1 PARROQUIA
router.get('/buscar/:code', (req, res, next) =>{
   'use strict'; 
    
    let query = {codigo: req.params.code}
    
    Parroquia.buscarParroquia(query, (err, parr) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(parr){
            
            return res.json({success: true, msg: "Se encontro la parroquia", data: parr});
        }else{
            
            return res.json({success: false, msg: "Parroquia no encontrado"});
        }
    });
});

router.put('/actualizar', (req, res, next) =>{
   'use strict'; 
    
    let parroquia = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Parroquia.actualizarParroquia(parroquia, (err, parr) =>{
       
       if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
       }
       
       if(parr){
            return res.json({success: true, msg: "Se actualizo la parroquia"});
        }else{
            return res.json({success: false, msg: "Parroquia no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let parr_code = req.body.codigo;
    
    Parroquia.eliminarParroquia(parr_code, (err, parr) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
       if(parr){
            return res.json({success: true, msg: "Se elimino la parroquia"});
        }else{
            return res.json({success: false, msg: "La parroquia no pudo ser eliminado"});
        }
    });
});

module.exports = router;