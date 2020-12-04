const express = require('express')

const router = express.Router();

const {getOrderById,createOrder,getAllOrder} = require('../controllers/orderController')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/authController')
const {getUserById,pushOrderInUserPurchaseList} = require('../controllers/userController')
const {} = require('../controllers/productController')

router.get('/test',(req,res)=>{
    res.json({
        msg: "Order Route"
    })
})



module.exports = router;
