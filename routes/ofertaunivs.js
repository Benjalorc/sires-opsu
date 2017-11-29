const express = require('express');
const router = express.Router();
const Universidad = require('../models/universidad');
const Ofertauniv = require('../models/ofertauniv');
const Egresosuniv = require('../models/egresosuniv');
const Municipio = require('../models/municipio');
const Parroquia = require('../models/parroquia');
const Carrera = require('../models/carrera');
const Promise = require("bluebird");


router.post('/agregar', (req, res, next) =>{


    let user = req.body.usuario._doc;

    console.log(user);
    console.log(req.body.oferta);

    if(user.tipo != 'universidad'){
      return res.json({success: false, msg:"Usuario no autorizado", auth:false});
    }
    else{

      if(user.institucion != req.body.oferta.univ){
        return res.json({success: false, msg:"Esta no es la universidad a la cual representa. Por favor verifique", auth:false});
      }
      else{


        let oferta = new Ofertauniv({
          universidad: req.body.oferta.univ,
          periodo: req.body.oferta.periodo,
          ano: req.body.oferta.ano,
          carrera: req.body.oferta.carr,
          cupos: req.body.oferta.oferta,
          inscritos: {
            opsu: 0,
            convenio: 0
          },
          egresados: 0
        });



        Ofertauniv.verificar(oferta, (err, data) =>{

            if(err) throw err;

            if(data){

              return res.json({success: false, msg: "Ya existe la oferta para la universidad, carrera y periodo indicados"});

            }

            else{

              Ofertauniv.ofertar(oferta, (err, data) =>{

                  if(err) throw err;

                  if(data){
                      return res.json({success: true, msg: "Muchas gracias por su colaboracion "+user.nombre+", ha cargado la oferta exitosamente", data: data});
                  }
                  else{
                      return res.json({success: false, msg: "Lo lamentamos "+user.nombre+", pero la oferta no pudo cargarse. Por favor notifique de este inconveniente"});
                  }
              });


            }

        });

      }
    }

});

router.get('/all', (req, res, next) =>{

    Ofertauniv.obtener({}, (err, ofertas) =>{
        if(err) throw err;

        if(ofertas){
            res.json({success: true, msg: "Se obtuvieron con exito las ofertas de las universidades", data: ofertas});
        }
        else{
            res.json({success: false, msg: "No se pudieron obtener las ofertas de las universidades"});
        }

   }); 

});

router.get('/buscar/:univ/:carr/:ano/:periodo', (req, res, next) =>{

    let obj = {
      univ: ""+req.params.univ, 
      carr: ""+req.params.carr, 
      ano: req.params.ano,
      periodo: req.params.periodo
    }

    console.log(obj);

    Ofertauniv.buscar(obj, (err, ofertas) =>{

        if(err) throw err;

        if(ofertas.length){

          return res.json({success: true, msg: "Se consiguieron los ingresos solicitados", data: ofertas});
        }
        else{

          return res.json({success: false, msg: "No se consiguieron datos con los parametros indicados"});
        }
    });

});

router.get('/egresos/:univ/:carr/:ano/:periodo', (req, res, next) =>{

    let obj = {
      univ: ""+req.params.univ, 
      carr: ""+req.params.carr, 
      ano: req.params.ano,
      periodo: req.params.periodo
    }

    console.log(obj);

    Egresosuniv.buscar(obj, (err, egresos) =>{

        if(err) throw err;

        if(egresos){
          return res.json({success: true, msg: "Se consiguieron los egresos solicitados", data: egresos});
        }
        else{
          return res.json({success: false, msg: "No se consiguieron egresos reportados para la carrera y periodo indicados"});          
        }

    });

});


router.put('/actualizar', (req, res, next) =>{
 
    let oferta = {
      universidad: req.body.universidad,
      periodo: req.body.periodo,
      ano: req.body.ano,
      carrera: req.body.carrera,
      cupos: req.body.cupos,
    }

    let query = {
      universidad: req.body.universidad,
      periodo: req.body.periodo,
      ano: req.body.ano,
      carrera: req.body.carrera,        
    }

    Ofertauniv.buscar(query, (err, offer) =>{

        if (err) throw err;

        if (offer) {

            offer.cupos = req.body.cupos;

            offer.save((err, uOffer) =>{
                if (err) throw err;

                if (uOffer) {
                    res.json({success: true, msg: "Oferta corregida exitosamente"});
                }
                else {
                    res.json({success: false, msg: "Se encontro el documento pero no se pudieron guardar los cambios"});
                }

            });
        }
        else{
            res.json({success: false, msg: "No se pudo conseguir la oferta que intento actualizar"});
        }

    });

});

router.put('/inscribir', (req, res, next) =>{



    let user = req.body.usuario._doc;


    if(user.tipo != 'universidad'){
      return res.json({success: false, msg:"Usuario no autorizado", auth:false});
    }
    else{

      if(user.institucion != req.body.inscripcion.universidad){
        return res.json({success: false, msg:"Esta no es la universidad a la cual representa. Por favor verifique", auth:false});
      }
      else{


        let query = {
          universidad: req.body.inscripcion.universidad,
          periodo: req.body.inscripcion.periodo,
          ano: req.body.inscripcion.ano,
          carrera: req.body.inscripcion.carrera
        }

        Ofertauniv.verificar(query, (err, offer) =>{

          if (err) throw err;

          if (offer) {

            let inscripcion = {
              univ: req.body.inscripcion.universidad,
              carr: req.body.inscripcion.carrera,
              ano: req.body.inscripcion.ano,
              periodo: req.body.inscripcion.periodo,
              inscritos: {
                opsu: req.body.inscripcion.inscritos.opsu,
                convenio: req.body.inscripcion.inscritos.convenio
              }
            }

            Ofertauniv.inscribir(inscripcion, (err, inscritos) =>{
              if (err) throw err;

              if (inscritos) {
                return res.json({success: true, msg: "Muchas gracias por su colaboracion "+user.nombre+", la inscripcion ha sido reportada exitosamente", data: inscritos});
              }
              else {
                return res.json({success: false, msg: "Ocurrio un error intentando registrar los ingresos"});
              }
            });

          }
          else{
            console.log("No lo encontre");
            return res.json({success: false, msg: "No se pudo conseguir el registro que se intentaba actualizar"});
          }

        });
     
      }
    }

});


router.put('/egresar', (req, res, next) =>{


  let user = req.body.usuario._doc;

    //VERIFICO EL TIPO DE USUARIO
  if(user.tipo != 'universidad'){
    return res.json({success: false, msg:"Usuario no autorizado", auth:false});
  }

  if(user.institucion != req.body.egresos.universidad){
    return res.json({success: false, msg:"Esta no es la universidad a la cual representa. Por favor verifique", auth:false});
  }

  let query = {
    universidad: req.body.egresos.universidad,
    carrera: req.body.egresos.carrera
  }
  //BUSCO LA OFERTA (PENDIENTE DE CAMBIAR NOMBRE A MATRICULA)
  //DE ESA CARRERA Y UNIVERSIDAD DE TODOS LOS AÑOS
  Ofertauniv.encontrar(query, (err, offer) =>{
    if (err) throw err;
    
    if (offer) {



      //FILTRO Y ME QUEDO SOLO CON LOS DOCUMENTOS
      //QUE HAGAN MATCH CON LOS PERIODOS DE LOS CUALES
      //ESTOY EGRESANDO ESTUDIANTES
      let docs1 = [];
      req.body.egresos.egresados.forEach((element) =>{

        let egreso = element;
        let doc = offer.find((element) =>{return (element.ano == egreso.ano)&&(element.periodo == egreso.periodo)});

        if(doc){
          docs1.push(doc);
        }

      });


      let egresos = req.body.egresos;

      let newEgreso = new Egresosuniv({
        universidad: egresos.universidad,
        ano: egresos.ano,
        periodo: egresos.periodo,
        carrera: egresos.carrera,
        egresados: egresos.egresados
      });

      Egresosuniv.guardar(newEgreso, (err, documento) =>{
        if(err) throw err;

        if(documento){
        
          let docs2 = []   
          //AQUI HAGO LA SUMATORIA DE LOS EGRESADOS
          //A LOS DOCUMENTOS RESPECTIVOS
          for(let i = 0, j = egresos.egresados.length; i<j; i++){
            let doc = docs1.find((element) =>{return (element.ano==egresos.egresados[i].ano)&&(element.periodo==egresos.egresados[i].periodo) });
            doc.egresados.graduacion += egresos.egresados[i].graduacion;
            doc.egresados.retiro += egresos.egresados[i].retiro;
            docs2.push(doc);
          }

          var files = [];        
          docs2.forEach((element) =>{
            
            let p = new Promise((resolve, reject) =>{
              let r = element.save();
              resolve(r);
            })

            files.push(p)
          });

          Promise.all(files)
            .then(() =>{
              console.log("COÑO ENTRAAAAA!");
              next();
            });          

        }
        else{
          return res.json({success: false, msg: "Hubo un error intentando guardar el reporte de egresos"});
        }
      });

    }
    else{
      return res.json({success: false, msg: "Disculpe, no se encontro el registro a actualizar"});
    }
  });
  

    
}, (req, res, next) =>{

  console.log("ME LLAMARON ACA");
  return res.json({success: true, msg: "Exito!!!"});

});


router.delete('/eliminar', (req, res, next) =>{
 
});

module.exports = router;


/*

        let egresos = {
          univ: req.body.egresos.universidad,
          carr: req.body.egresos.carrera,
          ano: req.body.egresos.ano,
          periodo: req.body.egresos.periodo,
          egresados: {
            graduacion: req.body.egresos.graduacion,
            retiro: req.body.egresos.retiro
          } 
        }

        //BUSCO SI YA REPORTE EGRESOS EN ESE PERIODO Y CARRERA
        Egresosuniv.buscar(egresos, (err, egreso) =>{
          if(err) throw err;

          if(egreso){
            return res.json({success: false, msg:"Ya habia reportado egresos en la carrera y periodo indicados"});
          }
          else{


            let query = {
              universidad: req.body.egresos.universidad,
              carrera: req.body.egresos.carrera
            }


            //BUSCO LA OFERTA (PENDIENTE DE CAMBIAR NOMBRE A MATRICULA)
            //DE ESA CARRERA Y UNIVERSIDAD DE TODOS LOS AÑOS
            Ofertauniv.encontrar(query, (err, offer) =>{

              if (err) throw err;

              if (offer) {

                //FILTRO Y ME QUEDO SOLO CON LOS DOCUMENTOS
                //QUE HAGAN MATCH CON LOS PERIODOS DE LOS CUALES
                //ESTOY EGRESANDO ESTUDIANTES
                let docs1 = [];
                req.body.egresos.egresados.forEach((element) =>{

                  let egreso = element;
                  let doc = offer.find((element) =>{return (element.ano == egreso.ano)&&(element.periodo == egreso.periodo)});

                  if(doc){
                    docs1.push(doc);
                  }

                });

                //SI ME QUEDARON MENOS DOCUMENTOS QUE
                //LA CANTIDAD DE PERIODOS DE LOS CUALES REPORTO
                //SIGNIFICA UN ERROR Y DEBE RETORNAR Y CANCELAR
                if(docs1.length < req.body.egresos.egresados.length){
                  return res.json({success: false, msg: "Disculpe, pero ha intentado reportar egreso(s) de estudiantes en periodos de inscripcion no encontrados. Se ha cancelado la operacion"});
                }


                //FILTRO Y ME QUEDO CON LOS DOCUMENTOS
                //QUE AUN TENGAN ESTUDIANTES PENDIENTES POR EGRESAR
                let docs2 = docs1.filter((element) =>{return element.egresados < (element.inscritos.opsu+element.inscritos.convenio)})



                //SI ME QUEDAN MENOS DOCUMENTOS QUE LOS QUE PRETENDIA ACTUALIZAR
                //QUIERE DECIR QUE EN ALGUNO YA TODOS LOS ESTUDIANTES FUERON 
                //REPORTADOS COMO EGRESADOS, POR LO TANTOS CANCELA LA OPERACION
                //PORQUE NO PUEDO EGRESAR MAS ESTUDIANTES DE UNA COHORTE EN LA CUAL
                //NO QUEDAN MAS ESTUDIANTES PENDIENTES
                if(docs2.length < req.body.egresos.egresados.length){
                  return res.json({success: false, msg: "Disculpe, alguno(s) de los egresos que intenta reportar estan en conflicto. Todos los estudiantes de esa cohorte ya fueron reportados como egresados"});
                }


                //VERIFICO SI ALGUNO DE LOS EGRESOS QUE INTENTO REPORTAR
                //EXCEDEN LA CANTIDAD DE ESTUDIANTES PENDIENTES DE LA COHORTE
                req.body.egresos.egresados.forEach((element) =>{

                  let egreso = element;
                  let doc = docs2.find((element) =>{return (element.ano == egreso.ano)&&(element.periodo == egreso.periodo)});

                  if( (doc.egresados+egreso.cantidad) > (doc.inscritos.opsu+doc.inscritos.convenio)){
                    return res.json({success: false, msg: "Disculpe, alguno(s) de los egresos que intenta reportar excede la cantidad de estudiantes que aun cursaban correspondientes a su cohorte"});
                  }
     
                });


                let egresos = {
                  univ: req.body.egresos.universidad,
                  carr: req.body.egresos.carrera,
                  ano: req.body.egresos.ano,
                  periodo: req.body.egresos.periodo,
                  egresados: req.body.egresos.egresados
                }



                let newEgresos = new Egresosuniv({
                  universidad:egresos.univ,
                  carrera: egresos.carr,
                  ano: egresos.ano,
                  periodo: egresos.periodo,
                  egresados: egresos.egresados
                });
                 
                Egresosuniv.guardar(newEgresos, (err, documentos) =>{
                  if(err) throw err;

                  if(documentos){



                    let docs3 = [];
                    //AQUI HAGO LA SUMATORIA DE LOS EGRESADOS
                    //A LOS DOCUMENTOS RESPECTIVOS
                    for(let i = 0, j = egresos.egresados.length; i<j; i++){
                      let doc = docs2.find((element) =>{return (element.ano==egresos.egresados[i].ano)&&(element.periodo==egresos.egresados[i].periodo) });
                      doc.egresados += egresos.egresados[i].cantidad;
                      docs3.push(doc);
                    }

                    Promise.all(docs3.map(doc => doc.save() ))
                    .then((docs) => {

                      return res.json({success: true, msg: "Muchas gracias por su colaboracion "+user.nombre+", los egresos fueron reportados exitosamente", data: docs});
                    });
                  }
                  else{

                    return res.json({success: false, msg: "Hubo un error intentando guardar el reporte de egresos", data: docs});
                  }
                });

              }
              else{

              }
            });

          }
        });


*/