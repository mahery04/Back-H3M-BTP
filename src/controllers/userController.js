const jwt = require('jsonwebtoken');
const generateToken = require('../../config/generateToken');
const User = require('../models/userModel')

exports.auth = function (req, res) {
    const userData = new User(req.body)
     if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } 
    else {
        User.userToLog(userData.login, userData.password, function(err, result) {
            // if (err) res.send(err);
            res.status(201).json({
                user_id:    result[0].user_id,
                role_id:    result[0].role_id,
                login:      result[0].login,
                password:   result[0].password,
                role_name:  result[0].role_name,
                token:      generateToken(result[0].user_id)
            });
            console.log(result)
        });
    } 
}

exports.access = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) res.status(401);
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            console.log('error 2')
            return res.status(401)
        }
        req.user = { user }
        next();
    })
}