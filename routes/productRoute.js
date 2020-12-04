const express = require('express')

const router = express.Router();

const {isSignedIn, isAuthenticated,isAdmin} = require('../controllers/authController')
const {getUserById} = require('../controllers/userController')
const { getProductById, createProduct, getProduct, getProductPhoto, removeProduct, updateProduct, getAllProducts } = require('../controllers/productController')


router.param("userId", getUserById)
router.param("productId", getProductById)


router.get('/test',(req,res)=>{
    res.json({
        msg: "product route"
    }) 
})

router.post('/create/:userId',isSignedIn,isAuthenticated,isAdmin ,createProduct)

router.delete('/:productId/:userId',isSignedIn,isAuthenticated,isAdmin, removeProduct)

router.put('/:productId/:userId',isSignedIn,isAuthenticated,isAdmin, updateProduct)

router.get('/products', getAllProducts)

router.get('/:productId',getProduct)
router.get('/photo/:productId',getProductPhoto)


module.exports = router;