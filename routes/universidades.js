const express = require('express');
const router = express.Router();
const Universidad = require('../models/universidad');
const Municipio = require('../models/municipio');
const Parroquia = require('../models/parroquia');
const Carrera = require('../models/carrera');

router.post('/insertar', (req, res, next) =>{
    'use strict';

    let universidades = req.body;
    let documentos = [];

    universidades.forEach((element) =>{

        let carreras = [];
        element.carreras.forEach((element) =>{
            let carrera = {
                codigo: element.codigo,
                cod_int: element.codigo_int,
                modalidad: element.modalidad,
                titulos: element.titulos
            }
            carreras.push(carrera);
        });

        let univ = new Universidad({
            codigo: element.codigo,
            siglas: element.siglas,
            nombre: element.nombre,
            nucleo: element.nucleo,
            ubicacion: element.parroquia,
            carreras: carreras,
            gestion: element.gestion
        });

        documentos.push(univ);
    });

    Universidad.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});

//REGISTRAR UNIVERSIDAD
router.post('/registrar', (req, res, next) =>{
    'use strict';

    let cod_parr = req.body.ubicacion;
    let cod_univ = req.body.codigo;

    let query = {codigo: cod_parr}
    Parroquia.buscarParroquia(query, (err, parroquia) =>{
        
        if(err){
            return res.json({success: false, msg: "Error al consultar en parroquia para asociar a universidad"});
        }
        
        if(parroquia){
            
            Universidad.verificarUniversidad(cod_univ, (err, universidad) =>{
                if(err){
                    return res.json({success: false, msg: "Error al consultar en universidad"});
                }
                if (universidad){
                    console.log(universidad);
                    return res.json({success: false, msg: "Ya existia esa universidad", data: universidad});
                }
                else{

                    let servicios = []; 
                    if(req.body.servicios.length){
                        servicios=req.body.servicios;
                    }
                    else{
                        servicios = [];
                    }
                    let newUniversidad = new Universidad({
                        codigo: req.body.codigo,
                        nombre: req.body.nombre,
                        siglas: req.body.siglas,
                        nucleo: req.body.nucleo,
                        ubicacion: req.body.ubicacion,
                        capacidad: req.body.capacidad,
                        matricula: req.body.poblacion,
                        servicios: servicios,
                        carreras: [],
                        gestion: req.body.gestion
                    });

                    console.log(newUniversidad);

                    Universidad.registrarUniversidad(newUniversidad, (err, universidad) =>{
                
                        if(err){
                            console.log(err);
                            return res.json({success:false, msg:"Fallo al agregar universidad en la base de datos"});
                        }else{
                            return res.json({success:true, msg:"Universidad agregada con exito", data: universidad});
                        }
                    });
                }
            });
        }
        else{
            return res.json({success: false, msg: "No se encontro la parroquia"});
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
            return res.json({success: true, msg: "Se encontro la universidad", data: universidad[0]});
        }else{
            return res.json({success: false, msg: "Universidad no encontrada"});
        }
    });
});


router.get('/getbymun/:codigo', (req, res, next) =>{
    'use strict';

    let mun = req.params.codigo;

    Universidad.getByMun(mun, (err, universidades) =>{
                
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(universidades){
            return res.json({success: true, msg: "Se encontraron las universidades", data: universidades});
        }else{
            return res.json({success: false, msg: "Universidades no encontradas"});
        }
    });
});

router.get('/getbyparr/:codigo', (req, res, next) =>{
    'use strict';

    let parr = req.params.codigo;

    Universidad.getByParr(parr, (err, universidades) =>{
                
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(universidades){
            return res.json({success: true, msg: "Se encontraron las universidades", data: universidades});
        }else{
            return res.json({success: false, msg: "Universidades no encontradas"});
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

router.get('/:estado', (req, res, next) =>{
   'use strict';
   
   let state = ""+req.params.estado;

   Universidad.listarUniversidades(req.params.estado, (err, universidades) =>{

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

router.put('/actualizarCarreras', (req, res, next) =>{


    Universidad.verificarUniversidad(req.body.universidad, (err, univ) =>{

        if (err) throw err;

        if(univ){

            if(univ.carreras.length){

    //            console.log(univ);
                let indice = univ.carreras.findIndex((element) =>{return element.codigo_int == req.body.carrera.codigo_int});
    //            console.log(indice);
                
                if(indice>=0){

                    univ.carreras[indice].modalidad = req.body.carrera.modalidad;
                    univ.carreras[indice].titulos = req.body.carrera.titulos;
                    
                }
                else{
                    univ.carreras.push(req.body.carrera)
                }

            }
            else{
                univ.carreras = [];
                univ.carreras.push(req.body.carrera);
            }


                univ.save((err, uUniv) =>{

                  if(err) throw err;

                  if(uUniv){
                        console.log(uUniv);
                        return res.json({success: true, msg:"Actualizacion exitosa", data: uUniv});
                    }
                    else{

                    }

                });
    
        }
        else{

        }

    });

});


router.post('/agregarCarrera', (req, res, next) =>{

    console.log(req.body);

    Universidad.verificarUniversidad(req.body.universidad, (err, univ) =>{

        if (err) throw err;

        if(univ){

            if(univ.carreras.find((element) =>{return element.codigo_int == req.body.carrera.codigo_int})){
                return res.json({success: false, msg:"La univeridad ya ofrece esa carrera"});
            }
            else{

                if(!univ.carreras.length){
                    univ.carreras = [];
                }

                univ.carreras.push(req.body.carrera);
                univ.save((err, uUniv) =>{

                  if(err) throw err;

                  if(uUniv){
                        console.log(uUniv);
                        return res.json({success: true, msg:"Actualizacion exitosa", data: uUniv});
                    }
                    else{
                        return res.json({success: false, msg:"Actualizacion fallida"});
                    }

                });

            }
        }
        else{
            return res.json({success: false, msg:"Fallo la busqueda de la universidad"});
        }
    });

});

router.put('/eliminarCarrera', (req, res, next) =>{


    Universidad.verificarUniversidad(req.body.universidad, (err, univ) =>{

        if (err) throw err;

        if(univ){

            let carrerasOriginales = univ.carreras;

            if(univ.carreras.length){

                let carrerasNuevas = univ.carreras.filter((element) =>{return element.codigo_int != req.body.carrera.codigo_int});

                if(carrerasOriginales.length == carrerasNuevas.length){
                    return res.json({success: false, msg:"No se encontro coincidencia de esa carrera. Habia sido eliminada anteriormente?"});
                }
                else{


                    univ.carreras = carrerasNuevas;
                    univ.save((err, uUniv) =>{

                      if(err) throw err;

                      if(uUniv){
                            console.log(uUniv);
                            return res.json({success: true, msg:"Carrera eliminada con exito", data: uUniv});
                        }
                        else{

                        }

                    });


                }


            }
            else{
                return res.json({success: false, msg:"Esa universidad ya se encontraba sin carreras"});
            }
    
        }
        else{

        }

    });

});


router.put('/incluircarrera', (req, res, next) =>{
    
    let query = {codigo: req.body.carrera}
    Carrera.buscarCarrera(query, (err, carrera) =>{
        
        if(err){
            return res.json({success: false, msg: "Error al consultar en carrera"});
        }
        
        if(carrera){
            
            let query = {
                codigo: req.body.universidad,
                carrera: carrera._id
            }

            Universidad.verificarCarrera(query, (err, univ) =>{
                //ESTO ES PARA VERIFICAR SI EN LA UNIVERSIDAD YA EXISTE LA CARRERA
                if(err){
                    return res.json({success: false, msg: "Error al intentar verificar la existencia de la carrera en la universidad"});
                }
                if(univ){
                   return res.json({success: false, msg: "Esa carrera ya existe en esa universidad"});
                }
                else{

                    Universidad.incluirCarrera(query, (err, uni) =>{
                       
                        if(err){
                           return res.json({success: false, msg: "Error al ejecutar la consulta"});
                        }                 
                        if(uni){
                            return res.json({success: true, msg: "Se pudo incluir la carrera", data: uni});
                        }
                        else{
                            return res.json({success: false, msg: "La carrera no pudo incluirse"});
                        }
                    });

                }
            });
                        
        }else{
            return res.json({success: false, msg: "No se encontro la carrera"});
        }
    });
});



router.put('/actualizarUniversidad', (req, res, next) =>{
    'use strict'; 
    
    let universidad = {
        codigo: req.body.univ,
        updatedData: req.body.datos
    }

    console.log(universidad);
    
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

    let univ = req.body.univ;
    
    Universidad.eliminarUniversidad(univ, (err, univ) =>{
        
        if(err){
            throw err;
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(univ){
            return res.json({success: true, msg: "Se elimino la universidad", data: univ});
        }else{
            return res.json({success: false, msg: "La universidad no pudo ser eliminada"});
        }
    });
});

module.exports = router;