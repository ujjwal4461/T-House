const express = require('express');

const router = express.Router();

const {getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, removeCategory} = require('../controllers/categoryController')
const {isAdmin,isSignedIn,isAuthenticated} = require('../controllers/authController')
const {getUserById} = require('../controllers/userController')

router.param('categoryId',getCategoryById);
router.param('userId',getUserById);

router.get('/test',(req,res)=>{
    console.log('category route')
    res.end();
})


router.post('/create/:userId',isSignedIn,isAuthenticated,isAdmin, createCategory)

router.delete('/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin, removeCategory)

router.put('/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin, updateCategory)

router.get('/categories', getAllCategory)

router.get('/:categoryId', getCategory)





module.exports = router;