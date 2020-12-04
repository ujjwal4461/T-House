const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }

})

module.exports = mongoose.model("Product",productSchema)