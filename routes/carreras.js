const express = require('express');
const router = express.Router();
const Carrera = require('../models/carrera');


//AGREGAR CARRERA
router.post('/agregar', (req, res, next) =>{
    'use strict';

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
});
    
router.get('/buscar/:codigo', (req, res, next) =>{
    'use strict';

    let codigo = req.params.codigo;

    Carrera.buscarCarrera(codigo, (err, carrera) =>{
        
        
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

module.exports = router;