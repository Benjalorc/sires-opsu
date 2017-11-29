const express = require('express');
const router = express.Router();
const Estado = require('../models/estado');

router.post('/insertar', (req, res, next) =>{
    'use strict';

    let estados = req.body;
    let documentos = [];

    estados.forEach((element) =>{

        let estado = new Estado({
            codigo: element.codigo,
            nombre: element.nombre,
            estandar: element.estandar
        });

        documentos.push(estado);
    });

    Estado.guardarVarios(documentos, (err, docs) =>{
        if(err) throw err;

        if(docs){
            return res.json({success: true, msg:"Operacion exitosa", data: docs});
        }
        else{
            return res.json({success: false, msg:"Operacion fallida"});
        }

    });

});

//REGISTRAR ESTADO
router.post('/registrar', (req, res, next) =>{
    'use strict';

    let newEstado = new Estado({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        poblacion: req.body.poblacion,
        superficie: req.body.superficie
    });
    
    Estado.registrarEstado(newEstado, (err, estado) =>{
        if(err){
            return res.json({success:false, msg:"Fallo al registrar estado"});
        }else{
            return res.json({success:true, msg:"Estado registrado con exito"});
        }
     });
});

//BUSCAR TODOS LOS ESTADOS
router.get('/buscar', (req, res, next) =>{
   'use strict'; 
    
    Estado.obtenerEstados('', (err, est) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(est){
            
            return res.json({success: true, msg: "Se encontraron los estados", data: est});
        }else{
            
            return res.json({success: false, msg: "Estados no encontrados"});
        }
    });
});

//BUSCAR 1 ESTADO
router.get('/buscar/:code', (req, res, next) =>{
   'use strict'; 
    
    let est_code = req.params.code;
    
    Estado.buscarEstado(est_code, (err, est) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(est){
            
            return res.json({success: true, msg: "Se encontro el estado", data: est});
        }else{
            
            return res.json({success: false, msg: "Estado no encontrado"});
        }
    });
});

router.put('/actualizar', (req, res, next) =>{
   'use strict'; 
    
    let estado = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Estado.actualizarEstado(estado, (err, est) =>{
       
       if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
       }
       
       if(est){
            return res.json({success: true, msg: "Se actualizo el estado"});
        }else{
            return res.json({success: false, msg: "Estado no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let est_code = req.body.codigo;
    
    Estado.eliminarEstado(est_code, (err, est) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
       if(est){
            return res.json({success: true, msg: "Se elimino el estado"});
        }else{
            return res.json({success: false, msg: "El estado no pudo ser eliminado"});
        }
    });
});

module.exports = router;