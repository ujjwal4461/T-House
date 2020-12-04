const {Order, ProductCart} = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')

exports.getOrderById = function(req,res,next,id){
    Order.findById(id)
    .populate("products.product")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error: "Cannot find order"
            })
        }
        req.order = order;
    })
    next();
}

exports.createOrder = function(req,res){
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to save your order"
          });
        }
        res.json(order);
      });
}

exports.getAllOrder = function(req,res){
    Order.find()
    .populate("user")
    .exec((err,orders)=>{
        if (err) {
            return res.status(400).json({
              error: "Failed to get all order"
            });
          }
        res.json({
            orders,
        })
    })
}