const express = require('express');
const router = express.Router();
const Universidad = require('../models/universidad');
const Liceo = require('../models/liceo');
const Ofertaliceo = require('../models/ofertaliceo');
const Municipio = require('../models/municipio');
const Parroquia = require('../models/parroquia');
const Carrera = require('../models/carrera');

//REGISTRAR OFERTA DE UN LICEO
router.post('/crear', (req, res, next) =>{
    'use strict';

    let query = {
        liceo: req.body.liceo,
        ano: req.body.ano,
        periodo: req.body.periodo
    }
    Ofertaliceo.check(query, (err, offer) =>{

        if(err){
            res.json({success: false, msg: "Error intentando verificar la existencia de oferta"});
        }
        if(offer.length){
            res.json({success: false, msg: "Ya existe el objeto para ese liceo en la cohorte indicada. Se le ofrecera un formulario para añadir o editar las ofertas", data: offer});
        }
        else{

            Liceo.buscarLiceo(req.body.liceo, (err, lic) =>{

                if(err){
                    throw err;
                }
                if(lic){

                    let newOffer = new Ofertaliceo({
                        liceo: lic._id,
                        ano: req.body.ano,
                        periodo: req.body.periodo
                    });

                    Ofertaliceo.crear(newOffer, (err, offer) =>{

                        if(err){
                            res.json({success: false, msg: "Error intentando crear el documento de oferta"});
                        }
                        if(offer){
                            res.json({success: true, msg: "Se logro crear el documento de oferta. A continuacion podrá cargar las ofertas por carrera", data: offer});
                        }
                        else{
                            res.json({success: false, msg: "No se pudo crear el documento de oferta"});
                        }
                    });
                }else{                    
                    res.json({success: false, msg:"No se encontro el liceo para asociarla"});
                }
            });
        }
    });
});
 

router.put('/addtodoc', (req, res, next) =>{

    Liceo.buscarLiceo(req.body.liceo, (err, lic) =>{

        if(err) throw err;

        if(lic){

            Universidad.buscarUniversidad(req.body.oferta.universidad, (err, univ) =>{

                if(err) throw err;

                if(univ){

                    let carr = univ.carreras.find((element) =>{ return element.codigo == req.body.oferta.carrera});
                    
                    if(carr){

                        let nuevaOferta = {
                            liceo: lic._id,
                            ano: req.body.ano,
                            periodo: req.body.periodo,
                            oferta:{
                                carrera: carr._id,
                                universidad: univ._id,
                                cupos: req.body.oferta.cupos
                            }
                        }

                        Ofertaliceo.addOffer(nuevaOferta, (err, offer) =>{
                            if(err) throw err;
                            if(offer){

                                if(offer.oferta.find((element) =>{ return element.carrera.equals(nuevaOferta.oferta.carrera) }) ){
                                    res.json({success: false, msg: "El liceo elegido ya tiene su oferta para esa carrera en el ano y periodo indicados"});
                                }
                                else{
                                    offer.oferta.push(nuevaOferta.oferta);
                                    offer.save( (err, uOffer)=>{
                                        if(err) throw err;

                                        if(uOffer){
                                            res.json({success: true, msg: "Se ha incluido la oferta satisfactoriamente", data: uOffer});
                                        }
                                        else{
                                            res.json({success: false, msg: "Ocurrio un error intentando incluir la oferta"});
                                        }
                                    });
                                }
                            }
                            else{
                                res.json({success: false, msg: "No hay documento de oferta para el liceo, ano y periodo seleccionados. Asegurese de crearlo primero"});
                            }
                        });
                    }
                    else{
                        res.json({success:false, msg: "La carrera solicitada no se dicta en la universidad indicada"});
                    }
                }
                else{
                    res.json({success:false, msg: "La universidad indicada no existe"});
                }
            });
        }
        else{
            res.json({success: false, msg: "No se pudo encontrar el liceo indicado"});
        }
    });
});

router.get('/all', (req, res, next) =>{

    Ofertaliceo.obtener({}, (err, ofertas) =>{
        if(err) throw err;

        if(ofertas){
            res.json({success: true, msg: "Se obtuvieron con exito las ofertas de los liceos", data: ofertas});
        }
        else{
            res.json({success: false, msg: "No se pudieron obtener las ofertas de los liceos"});
        }
   }); 

});

router.delete('/eliminar', (req, res, next) =>{
 
});

module.exports = router;