const express = require('express');
const router = express.Router();
const Municipio = require('../models/municipio');


//REGISTRAR MUNICIPIO
router.post('/registrar', (req, res, next) =>{
    'use strict';

    let newMunicipio = new Municipio({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        poblacion: req.body.poblacion,
        superficie: req.body.superficie
    });
    
    Municipio.registrarMunicipio(newMunicipio, (err, municipio) =>{
        if(err){
            return res.json({success:false, msg:"Fallo al registrar municipio"});
        }else{
            return res.json({success:true, msg:"Municipio registrado con exito"});
        }
     });
});

//BUSCAR TODOS LOS MUNICIPIOS

router.get('/buscar', (req, res, next) =>{
   'use strict'; 
    
    Municipio.obtenerMunicipios('', (err, mun) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(mun){
            
            return res.json({success: true, msg: "Se encontraron los municipios", data: mun});
        }else{
            
            return res.json({success: false, msg: "Municipios no encontrados"});
        }
    });
});

//BUSCAR 1 MUNICIPIO
router.get('/buscar/:code', (req, res, next) =>{
   'use strict'; 
    
    let mun_code = req.params.code;
    
    Municipio.buscarMunicipio(mun_code, (err, mun) =>{
        
        
        if(err){
            return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
        
        if(mun){
            
            return res.json({success: true, msg: "Se encontro el municipio", data: mun});
        }else{
            
            return res.json({success: false, msg: "Municipio no encontrado"});
        }
    });
});

router.put('/actualizar', (req, res, next) =>{
   'use strict'; 
    
    let municipio = {
        codigo: req.body.codigo,
        updatedData: req.body.datosNuevos
    }
    
    Municipio.actualizarMunicipio(municipio, (err, mun) =>{
       
       if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
       }
       
       if(mun){
            return res.json({success: true, msg: "Se actualizo el municipio"});
        }else{
            return res.json({success: false, msg: "Municipio no pudo actualizarse"});
        }
    });
});

router.delete('/eliminar', (req, res, next) =>{
    'use strict';

    let mun_code = req.body.codigo;
    
    Municipio.eliminarMunicipio(mun_code, (err, mun) =>{
        
        if(err){
           return res.json({success: false, msg: "Error al ejecutar la consulta"});
        }
       
       if(mun){
            return res.json({success: true, msg: "Se elimino el municipio"});
        }else{
            return res.json({success: false, msg: "El municipio no pudo ser eliminado"});
        }
    });
});

module.exports = router;