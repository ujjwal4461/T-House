const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')


exports.getProductById = function(req,res,next,id){
    Product.findById(id)
      .populate("Category")
      .exec((err,product)=>{
          if(err || !product){
              return res.status(403).json({
                  error: "Product not found"
              })
          }
          req.product = product;
          next();
      })
}


exports.createProduct = function(req,res){
    const form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image upload"
            })
        }

        const {name,price,description,category,stock} = fields;

        if(!name || !price || !description || !category || !stock){
            return res.status(400).json({
                error: "fill in all the required fields"
            })
        }

        const product = new Product(fields);

        if(file.photo){
            if(file.photo.size >= 3000000){
                return res.status(400).json({
                    error: "photo size too big"
                })
            }
            
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }
        product.save((err,product)=>{
            console.log(product)
            if(err){
                return res.status(400).json({
                    error: "Error saving product"
                })
            }
            return res.json({
                name: product.name,
                decs: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                photo: product.photo
            })
        })
    })
}

exports.getProduct = function(req,res){
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.getProductPhoto = function(req,res){
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        res.send(req.product.photo.data)
    }
}

exports.updateProduct = function(req,res){
    const form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error: "problem with image upload"
            })
        }

        let product = req.product;
        product = _.extend(product,fields)

        if(file.photo){
            if(file.photo.size >= 3000000){
                return res.status(400).json({
                    error: "photo size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        product.save((err,product)=>{
            console.log(product)
            if(err){
                return res.status(400).json({
                    error: "Error saving product"
                })
            }
            res.json({
                product,
            })
        })
    })
}

exports.removeProduct = function(req,res){
    Product.findByIdAndRemove({_id: req.product._id},
        {useFindAndModify: false},
        (err,removedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to remove product"
            })
        }
        res.json({
            product: removedProduct,
            msg: "Product Removed Sucessfully"
        })
    })
}


exports.getAllProducts = function(req,res){
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const sort = req.query.sortBy ? req.query.sortBy : "_id";
    
    Product.find()
      .select("-photo")
      .populate("category")
      .limit(limit)
      .sort([[sort,"asc"]])
      .exec((err,products)=>{
          if(err){
              return res.status(400).json({
                  error: "Unable to find products"
              })
          }
          res.json({
              products: products
          })
    })
}

exports.getAllUniqueCategory = function(req,res){
    Product.distinct("category", {}, (err,category)=>{
        if(err){
            return res.status(400).json({
                error: "Error getting category"
            })
        }
        res.json(category)
    })
}


exports.updateInventory = function(req,res,next){
    let operations = req.body.order.products.map((product)=>{
        return {
            updateOne: {
                filter: {
                    _id: product._id
                },
                update: {
                    $inc: {
                        stock: -product.quantity,
                        sold: +product.quantity
                    }
                }
            }
        }
    })

    Product.bulkWrite(operations,{},(err,product)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to Update bulk operations"
            })
        }
    })
    next();
}