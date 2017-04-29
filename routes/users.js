const express = require('express');
const router = express.Router();

//REGISTER
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

//AUNTHENTICATE
router.post('/authenticate', (req, res, next) => {
    res.send('AUNTHENTICATE');
});

//VALIDATE
router.get('/validate', (req, res, next) => {
    res.send('PROFILE');
});

//PROFILE
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;