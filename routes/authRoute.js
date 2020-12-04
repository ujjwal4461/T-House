const express = require('express')
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/user')
const {signupUser, signinUser, isSignedIn, isAuthenticated, signoutUser, isAdmin} = require('../controllers/authController');

router.post('/signup',[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
],signupUser)

router.post('/signin',[
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
],signinUser);

router.get('/signout', signoutUser);

router.get('/test',isSignedIn,isAuthenticated,(req,res)=>{
    res.json(req.auth);
})


module.exports = router;