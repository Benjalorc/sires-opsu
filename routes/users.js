const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

//REGISTER
router.post('/register', (req, res, next) => {
    //res.send('REGISTER');
    'use strict';
    let newUser = new User({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        password: req.body.password,
        f_nac: req.body.f_nac,
        sexo: req.body.sexo
    });
    
    User.addUser(newUser, (err, user) =>{
        
        if(err){
            res.json({success:false, msg:"Fallo al registrar usuario"});
        }else{
            res.json({success:true, msg:"Usuario registrado"});
        }
    });
    
});

//AUNTHENTICATE
router.post('/authenticate', (req, res, next) => {
    res.send('AUNTHENTICATE');
});

//PROFILE
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;