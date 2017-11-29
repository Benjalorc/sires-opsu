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
    active:{
        type: Boolean,
        default: false,
        required: true
        
    },
    tipo:{
        type: String,
        required: true
    },
    institucion:{
        type: String,
        required: false
    }
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

module.exports.updateUserByCedula = function(cedula, callback){
    const query = {cedula: cedula};
    User.findOneAndUpdate(query, { $set: { active: true }}, callback);
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

module.exports.updateUser = function(req, callback){
    //PENDIENTE DE OPTIMIZAR ESTO
    User.findByIdAndUpdate(req.body._id, { $set: req.body}, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        
        if(err) throw err;
        callback(null, isMatch);
    });
}