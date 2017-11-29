const express = require('express');
const router = express.Router();
const Carrera = require('../models/carrera');

router.post('/insertar', (req, res, next) =>{
    'use strict';

    let carreras = req.body;
    let documentos = [];

    carreras.forEach((element) =>{

        let carrera = new Carrera({
            codigo: element.codigo,
            nombre: element.nombre,
            area: element.area,
            especialidad: element.especialidad,
            tipo: element.tipo
        });

        documentos.push(carrera);
    });

    Carrera.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});

//AGREGAR CARRERA
router.post('/agregar', (req, res, next) =>{
    'use strict';

    let carr_cod = req.body.codigo;

    Carrera.buscarCarrera(carr_cod, (err, carr) =>{

        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta de carreras"});
        }
        if(carr) {
            return res.json({success: false, msg: "Ya existia esa carrera"});
        }
        else{


            let newCarrera = new Carrera({
                codigo: req.body.codigo,
                nombre: req.body.nombre,
                titulo: req.body.titulo,
                especialidad: req.body.especialidad,
                area: req.body.area,
                duracion: req.body.duracion,
                modalidad: req.body.modalidad
            });
            
            Carrera.agregarCarrera(newCarrera, (err, carrera) =>{
                if(err){
                    return res.json({success:false, msg:"Fallo al agregar carrera en la base de datos"});
                }else{
                    return res.json({success:true, msg:"Carrera agregada con exito"});
                }
            });
        }
    });


});
    
router.get('/buscar/:codigo', (req, res, next) =>{
    'use strict';

    let query = {codigo: req.params.codigo};

    Carrera.buscarCarrera(query, (err, carrera) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(carrera){
            return res.json({success: true, msg: "Se encontro el municipio", data: carrera});
        }else{
            return res.json({success: false, msg: "Municipio no encontrado"});
        }
    });
});

router.get('/all', (req, res, next) =>{
   'use strict';
   
   Carrera.listarCarreras('', (err, carreras) =>{

        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(carreras){
            return res.json({success: true, msg: "Se encontro el listao de carreras", data: carreras});
        }else{
            return res.json({success: false, msg: "Listado de carreras no encontrado"});
        }
   })
});

router.get('/especialidad/:especialidad', (req, res, next) =>{

    let esp = req.params.especialidad;

    Carrera.buscarCarrerasPorEspecialidad(esp, (err, carreras) =>{

        if(err) throw err;

        if(carreras){
            return res.json({success: true, msg: "Se encontro el listao de carreras", data: carreras});
        }
        else{
            return res.json({success: false, msg: "Listado de carreras no encontrado"});
        }

    })

});

router.get('/allsorted', (req, res, next) =>{
    'use strict';

    Carrera.agruparCarrerasArea({}, (err, data) =>{
        if(err) throw err;

        if(data){
            let carrerasArea = data;
            Carrera.agruparCarrerasEspecialidad({}, (err, data2) =>{
                if(err) throw err;

                if(data2){
                    let carrerasEspecialidad = data2;
                    let carreras = {
                        Area: carrerasArea,
                        Especialidad: carrerasEspecialidad
                    }
                    return res.json({success: true, msg:"Aqui van las carreras ordenadas", data:carreras});
                }
                else{

                }
            });
        }
        else{

        }
    });

});

router.put('/actualizar', (req, res, next) =>{
    'use strict'; 
    
    let carrera = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Carrera.actualizarCarrera(carrera, (err, carr) =>{
       
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(carr){
            return res.json({success: true, msg: "Se actualizo la carrera"});
        }else{
            return res.json({success: false, msg: "La carrera no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let carr_cod = req.body.codigo;
    
    Carrera.eliminarCarrera(carr_cod, (err, carr) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
        if(carr){
            return res.json({success: true, msg: "Se elimino la carrera"});
        }else{
            return res.json({success: false, msg: "La carrera no pudo ser eliminada"});
        }
    });
});

router.get('/clasificar', (req, res, next) =>{
    'use strict'

    Carrera.listarCarreras('', (err, carreras) =>{

        if (err) throw err;

        if(carreras){

            let clasificacion = []

            carreras.forEach((element) =>{

                let carrera = element;

                if(!clasificacion.find((element) =>{return element.nombre == carrera.area}) ){
                    clasificacion.push({nombre: carrera.area, especialidades: []});
                }
            });

            let i = 0;
            clasificacion.forEach((element) =>{

                let area = element.nombre;

                let esp = [];

                let filtradas = carreras.filter((element) =>{return element.area == area});

                filtradas.forEach((element) =>{
                    let carrera = element;
                    if(!esp.find((element) =>{return element == carrera.especialidad}) ){
                        esp.push(carrera.especialidad);
                        clasificacion[i].especialidades.push(carrera.especialidad);
                    }
                });

                i++;
            });

            return res.json({success: true, msg: "Clasificacion encontrada", data: clasificacion});
        }
        else{
            return res.json({success: false, msg: "La carreras no se pudieron encontrar"});            
        }

    });

});

module.exports = router;