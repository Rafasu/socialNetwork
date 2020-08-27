'use strict'

const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');


function home(req, res){
    res.status(200).send({
        message: 'Hello world in node.js'
    });
}

function tests(req, res){
    res.status(200).send({
        message: 'Tests in node.js'
    });
}

function saveUser(req, res){
    const params = req.body;
    const user = new User();

    if(params.name && params.surname && params.nickname 
        && params.email && params.password){
        
        user.name = params.name;
        user.surname =  params.surname;
        user.nickname  =  params.nickname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        
        // Control duplicate users
        User.find({$or: [
                    {email: user.email.toLowerCase()}, 
                    {nickname: user.nickname.toLowerCase()}
                ]}).exec((err, users)=>{
                    if(err){
                        return res.status(500).send({message: 'Error on user petition'});
                    }
                    if(users && users.length >= 1){
                        return res.status(200).send({message: "User already exists"});
                    }else{
                        // Encrypt password and save data
                        bcrypt.hash(params.password, null, null, (err, hash)=>{
                            user.password = hash;
                            user.save((err, userStored) =>{
                                if(err) return res.status(500).send({message: 'Error while saving user'});

                                if(userStored){
                                    res.status(200).send({user: userStored});
                                }else{
                                    res.status(404).send({message: 'User not registered'});
                                }
                            });
                        });
                    }
                })

        

            
    }else{
        res.status(200).send({
            message: "All data is necessary"
        });
    }   
}

function loginUser(req, res){
    const params = req.body;
    const email = params.email;
    const password = params.password;

    User.findOne({email: email}, (err, user) =>{
        if(err) return res.status(500).send({message: 'Error in the request'});

        if(user){
            bcrypt.compare(password, user.password, (err, check)=>{
                if(check){
                    //Return user data
                    if(params.getToken){
                        // Generate and return token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        //Return user data
                        user.password = undefined;
                        return res.status(200).send({user});
                    }
                 
                }else{
                    return res.status(404).send({message: "User couldn't be identified"});
                }
            });
        }
        else{
            return res.status(404).send({message: "User could't be identified!"});
        }
    });
}

module.exports = {
    home, 
    tests, 
    saveUser, 
    loginUser
}