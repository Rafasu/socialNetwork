'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secretkeysocialnetwork';

exports.createToken = function(user){
    const payload = {
        sub: user._id, 
        name:  user.name, 
        surname: user.surname, 
        nickname: user.nickname,
        email: user.email, 
        role: user.role, 
        image: user.image, 
        iat: moment().unix(), 
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
}