const express = require('express');

const router = express.Router();

const {getUserById, getUser, updateUser, userPurchaseList} = require('../controllers/userController');
const { isSignedIn,isAuthenticated,isAdmin } = require('../controllers/authController')

router.param("userId", getUserById)

router.get('/test',(req,res)=>{
    res.json({
        data: req.body,
        msg: "user route"
    })
})

router.get('/:userId',isSignedIn, isAuthenticated ,getUser)

router.get('/orders/:userId',isSignedIn, isAuthenticated ,userPurchaseList)

router.put('/:userId',isSignedIn,isAuthenticated, updateUser)


module.exports = router;