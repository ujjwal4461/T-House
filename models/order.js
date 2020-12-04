const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productInCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    quantity: Number,
    price: Number
})

const ProductCart = mongoose.model("ProductCart",productInCartSchema)

const orderSchema = mongoose.Schema({
    products: [
        productInCartSchema
    ],
    transaction_id : {},
    amount : Number,
    address : String,
    status : {
        type: String,
        default: "",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    updated: Date
}, {timestamps: true})

const Order = mongoose.model("Order",orderSchema);

module.exports = {
    ProductCart,
    Order
}
