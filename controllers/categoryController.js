const Category = require('../models/category')


exports.getCategoryById = function(req,res,next,id){
    Category.findById(id,(err,cate)=>{
        if(err || !cate){
            return res.status(400).json({
                error: "Cannot find category by id"
            })
        }
        req.category = cate;
        next();
    })

}

exports.createCategory = function(req,res){
    const category = new Category(req.body);
    category.save((err,cate)=>{
        if(err || !cate){
            return res.status(403).json({
                error: "Error creating category"
            })
        }
        return res.json({
            category: cate
        })
    })
}

exports.getAllCategory = function(req,res){
    Category.find((err,cate)=>{
        if(err){
            return res.status(400).json({
                error: 'no category found'
            })
        }
        return res.json({
            categories:cate
        })
    })
}

exports.getCategory = function(req,res){
    return res.json({
        category: req.category
    })
}


exports.updateCategory = function(req,res){
    Category.findByIdAndUpdate(
        {_id: req.category._id},
        {$set: {name: req.body.name}},
        {new: true, useFindAndModify: false},
        (err,updatedCate)=>{
            if(err){
                return res.status(403).json({
                    error: "failed to update category"
                })
            }
            res.json({
                category: updatedCate,
                msg: "category updated sucessfully"
            })
        }
    )
}

exports.removeCategory = function(req,res){
    const category = req.category;
    category.remove((err,cate)=>{
        if(err){
            return res.status(403).json({
                error: "Failed to remove category"
            })
        }
        res.json({
            category: cate,
            msg: "Category deleted sucessfully"
        })
    })
}