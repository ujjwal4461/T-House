const User = require('../models/user')
const {Order} = require('../models/order')

exports.getUserById = function(req,res,next,id){
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        req.profile.salt = undefined;
        req.profile.encypted_password = undefined;
        req.profile._id = String(req.profile._id)
        next()
    })
}

exports.getUser = function(req,res){
    return res.json({
        user: req.profile
    })
}

exports.updateUser = function(req,res){
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "Cannot update user"
                })
            }
            user.salt = undefined;
            user.encypted_password = undefined;
            return res.json({
                user
            })
        }
    )
}

exports.userPurchaseList = function(req,res){
    Order.find({user: req.profile._id})
    .populate("user","_id name email")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error: "Cannot find any orders"
            })
        }
        res.json({
            orders: orders
        })
    })
}

exports.pushOrderInUserPurchaseList = function(req,res,next){
    let purchases = []
    req.body.order.products.array.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            quantity: product.quantity,
            category: product.category,
            description: product.description,
            transaction_id: product.transaction_id,
            amount: product.amount
        })
    });
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err,orders)=>{
            if(err){
                return res.status(400).json({
                    error: "error updating purchase list"
                })
            }
        }
    )
    next()
}