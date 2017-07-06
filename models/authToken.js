const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const AuthTokenSchema = mongoose.Schema({
    
    code:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
    
});

const AuthToken = module.exports = mongoose.model('AuthToken', AuthTokenSchema);


module.exports.addAuthToken = function(token, callback){
    token.save(callback);
}

module.exports.deleteAuthToken = function(code, callback){
    const query = {code: code};
    AuthToken.findOneAndRemove(query, callback);
}