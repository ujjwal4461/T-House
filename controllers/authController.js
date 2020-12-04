const express = require('express');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { check, validationResult } = require('express-validator');

exports.signupUser = function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            error: errors.array()[0].msg,
        })
    }
    const user = User(req.body);
    user.save(function(err,user){
        if(err || !user){
            return res.status(400).json({
                error: 'Error Saving User'
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signinUser = function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0].msg,
        })
    }
    
    const { email, password } = req.body;

    User.findOne({email:email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "Invalid username",
            })
        }
        if(!user.comparePassword(password)){
            return res.status(400).json({
                error: "Invalid username or password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id,name,email,role } = user;
        return res.json({
            token: token,
            user: {_id,name,email,role}
        })
    })
}

exports.signoutUser = function(req,res){
    res.clearCookie("token");
    res.json({
        msg: "You have been logged out"
    })
}

exports.isSignedIn = expressJWT({
    secret : process.env.SECRET,
    requestProperty: "auth"
})

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
};

exports.isAdmin = function(req,res,next){
    if(req.profile.role ==  0){
        return res.status(400).json({
            msg: "You are not authorised"
        })
    }
    next();
}

