const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const AuthToken = require('../models/authToken');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const randtoken = require('rand-token');


//REGISTER
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    'use strict';
    let exists = false;
   
   
    //VERIFICAR EXISTENCIA POR CEDULA
    User.getUserByCedula(req.body.cedula, (err, user) =>{
        
        if(err){
            return res.json({success:false, msg:"Fallo al consultar usuario en base de datos"});    
        }
        
        if(user){
            exists = true;
            return res.json({success:false, msg:"Ya existe un usuario registrado con esta cedula"});
        }
        
         //VERIFICACION ANIDADA
            //VERIFICAR EXISTENCIA POR NOMBRE DE USUARIO
            User.getUserByUsername(req.body.username, (err, user) =>{
               
                if(err){
                    return res.json({success:false, msg:"Fallo al consultar usuario en base de datos"});    
                }
                    
                if(user){
                    exists = true;
                    return res.json({success:false, msg:"Ya existe un usuario registrado con este nombre de usuario"});
                }
                
                
                 //VERIFICACION ANIDADA
                    //VERIFICAR EXISTENCIA POR EMAIL
                    User.getUserByUsername(req.body.email, (err, user) =>{
                       
                        if(err){
                            return res.json({success:false, msg:"Fallo al consultar usuario en base de datos"});    
                        }
                            
                        if(user){
                            exists = true;
                            return res.json({success:false, msg:"Ya existe un usuario registrado con este email"});
                        }
                        
                        
                         if(exists == false){
        
                            //CREAR EL OBJETO USUARIO
                            let newUser = new User({
                                cedula: req.body.cedula,
                                nombre: req.body.nombre,
                                apellido: req.body.apellido,
                                username: req.body.username,
                                password: req.body.password,
                                email: req.body.email,
                                sexo: req.body.sexo,
                                f_nac: req.body.f_nac,
                                active: true,
                                tipo: 'invitado'
                            });
                            
                            //AGREGAR EL USUARIO
                        
                            User.addUser(newUser, (err, user) =>{
                                
                                if(err){
                                    return res.json({success:false, msg:"Fallo al registrar usuario"});
                                }else{
                                    let transporter = nodemailer.createTransport(smtpTransport({
                                      service: 'gmail',
                                      auth: {
                                        user: 'benjalorc@gmail.com',
                                        pass: '11358965409612'
                                      }
                                    }));
                                    
                                    let token = new AuthToken({
                                        code: randtoken.generate(16),
                                        user: user.cedula
                                    });
                                    
                                    AuthToken.addAuthToken(token, (err, data) =>{
                                        if(err){
                                            return res.json({success:false, msg:"Fallo al generar token. No se envio correo de verificacion!"});
                                        }else{
                                           let mailOptions = {
                                              from: 'benjalorc@gmail.com',
                                              to: newUser.email,
                                              subject: 'Sending Email using Node.js',
                                              text: 'Correo automatico enviado con nodemailer!',
                                              html: "<p>Estimado "+newUser.nombre+" </p> <br> Haga clic en el enlace para verificar su correo y completar la activación de su cuenta.<br><a href=http://sires-opsu-nuevo-benjamin-s-e.c9users.io:8080/users/verify/"+token.code+">Verificar</a>" 
                                            };
                                    
                                            transporter.sendMail(mailOptions, function(error, info){
                                              if (error) {
                                                console.log(error);
                                              } else {
                                                console.log('Email sent: ' + info.response);
                                                
                                              }
                                            }); 
                                        }        
                                    });
                                    return res.json({success:true, msg:"Usuario registrado. Se ha enviado un correo a la dirección que indicó"});
                                }
                            });    
                    
                        }
                        
                    });   
                
            });
        
    });
    
});


router.get('/verify/:code', (req, res, next) =>{
    
    
    console.log(req.protocol+":/"+req.get('host'));
        if(/*(req.protocol+"://"+req.get('host'))==("https://"+host)*/true==true){
            
            console.log("Domain is matched. Information is from Authentic email");
            AuthToken.deleteAuthToken(req.params.code, (err, doc) =>{
                if(err){
                    console.log("No existe el usuario o ya fue utilizado el enlace");
                    res.redirect('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8081/login');
                }
                else{
                    if(doc){
                        console.log("Se procedera a activar al usuario");
                        User.updateUserByCedula(doc.user, (err, user) =>{
                           if(err){
                               console.log("Error al actualizar usuario");
                           }
                           else{
                               console.log("Usuario actualizado");
                               res.redirect('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8081/login');
                           }
                        });
                    }else{
                        console.log("No existe el usuario o ya fue utilizado el enlace");
                        res.redirect('https://sires-opsu-nuevo-benjamin-s-e.c9users.io:8081/login');    
                    }
                    
                }
                
                
            });
        }
        else{
            console.log("<h1>Request is from unknown source");
        }
});

//AUNTHENTICATE
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username, (err, user) =>{
        if(err) throw err;
        
        if(!user){
            
            return res.json({success: false, msg: 'Usuario no encontrado'});
        }
        
        User.comparePassword(password, user.password, (err, isMatch)=>{
           if(err) throw err;
           
           if(isMatch){
               
               if(user.active){
               
                   const token = jwt.sign(user, config.secret, {
                       expiresIn: 86400 //1 dia
                   });
                   
                    res.json({
                       success: true,
                       token: 'JWT '+token,
                       user: {
                           id: user._id,
                           cedula: user.cedula,
                           nombre: user.nombre,
                           username: user.username
                       }
                    });
               }else{
                  return res.json({success: false, msg: 'Verifique antes su cuenta a traves del enlace enviado a su correo'}) 
               }
           }else{
               return res.json({success: false, msg: 'Contraseña erronea'});
           }
        });
    });
});

//UPDATE
router.put('/update', (req, res, next) =>{
    'use strict';
    //PENDIENTE DE OPTIMIZAR ESTO
    User.updateUser(req, (err, challenge) =>{
        if(err){
            return res.json({success:false, msg:"Fallo al actualizar usuario"});
        }
        else{
            return res.json({success:true, msg:"Usuario actualizado"});
        }
    });
});

//DELETE
router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.body.id;
    
    User.deleteUser(id, (err, user) =>{
       
       if (err) throw err;
       
       if (user){
           return res.json({success: true, msg: 'Su usuario ha sido eliminado'});
       }else{
           return res.json({success: false, msg: 'Ha habido un problema eliminando su cuenta. Contacte a personal autorizado para solucionar el problema'});
       }
       
    });

});

//PROFILE
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


module.exports = router;