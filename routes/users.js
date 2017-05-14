const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


//DELETE


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
                                f_nac: new Date(req.body.f_nac.jsdate)
                            });
                            
                            //AGREGAR EL USUARIO
                        
                            User.addUser(newUser, (err, user) =>{
                                
                                if(err){
                                    return res.json({success:false, msg:"Fallo al registrar usuario"});
                                }else{
                                    return res.json({success:true, msg:"Usuario registrado"});
                                }
                            });    
                    
                        }
                        
                    });   
                
            });
        
    });
    
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
           } else{
               return res.json({success: false, msg: 'Contraseña erronea'});
           }
        });
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