const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    
    cedula:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required: true
    },
    f_nac:{
        type: Date,
        required: true
    },
    
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.deleteUser = function(id, callback){
    User.findByIdAndRemove(id, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username : username};
    User.findOne(query, callback);
}

module.exports.getUserByCedula = function(cedula, callback){
    const query = {cedula: cedula};
    User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) =>{
        
       bcrypt.hash(newUser.password, salt, (err, hash) =>{
           if(err) throw err;
           newUser.password = hash;
           newUser.save(callback);
       }); 
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        
        if(err) throw err;
        callback(null, isMatch);
    });
}